import UserModel from '../models/User'
import GroupModel from "../models/Group";
import ConversationModel from "../models/Conversation";

import mongoose from 'mongoose'

const moment = require('moment')

export default class UserDetailService {

    async getUserContacts(currentUser) {
        const {_id: userID} = currentUser
        const _result = await UserModel.findOne({_id: userID}).select('contacts')
        if (!_result) {
            return ({success: false, error: {message: 'No contacts!'}})
        } else {
            let contacts = _result.contacts
            return ({success: true, error: {}, data: {contacts}})
        }
    }

    async getGroupUserDetails(groupId) {
        const obj = await GroupModel.findOne({
            _id: groupId
        })
        const membersArr = []
        const {members} = obj

        if (members.length === 0) {
            return ({success: false, error: {message: 'No Group members !'}})
        }
        for (let i = 0; i < members.length; i++) {
            let result = await UserModel.findOne({
                _id: members[i]._id
            }).select('-password -contacts')

            result = result.toObject()
            result["isAdmin"] = members[i]["isAdmin"]
            result["permissions"] = members[i]["permissions"]
            result["adminLevel"] = members[i]["adminLevel"]

            membersArr.push(result)
        }
        return ({success: true, error: {}, data: {membersArr}})
    }

    async findContact(currentUser, email) {
        const _all = await this.getUserContacts(currentUser)
        const _result = _all.data.contacts.find(e => e.email == email)
        if (!_result) {
            return ({success: false, error: {message: 'No such contact!'}})
        } else {
            let contact = _result
            return ({success: true, error: {}, data: {contact}})
        }
    }

    async updateUserContact(currentUser, details) {
        const {name, email} = details
        if (email === currentUser.email) {
            return ({success: false, error: {message: 'You can\'t add yourself !'}})
        } else {
            const contactUser = await UserModel.findByCredentials(email)
            if (!contactUser) {
                return ({success: false, error: {message: 'The contact you\'re trying to add doesn\'t use this app!'}})
            }
            const currentUserObj = await UserModel.findByCredentials(currentUser.email)
            const searchResult = await this.findContact(currentUser, email)
            if (!searchResult.success) {
                currentUserObj.contacts.push({
                    _id: contactUser.id,
                    name,
                    email
                })
                await currentUserObj.save()
                return ({success: true, error: {}, data: {}})
            } else {
                return ({success: false, error: {message: 'Contact Already exists !'}})
            }
        }
    }

    async getUserGroups(userId) {
        const _result = await GroupModel.aggregate([{$match: {"members._id": mongoose.Types.ObjectId(userId)}}])
        if (!_result) {
            return ({success: false, error: {message: 'No Groups found !'}})
        } else {
            let obj = _result
            return ({success: true, error: {}, groups: obj})
        }
    }

    async getAdminGroups(currentUser) {
        const {_id: userID} = currentUser
        const _result = await GroupModel.find({"admins._id": currentUser._id})
        if (!_result) {
            return ({success: false, error: {message: 'No Groups found !'}})
        } else {
            let obj = _result
            return ({success: true, error: {}, data: {obj}})
        }

    }

    async getGroupAdmins(groupId) {
        if (groupId === null || groupId === "") {
            return ({success: false, error: {message: 'Invalid route params !'}})
        }
        const obj = await GroupModel.findOne({
            _id: groupId
        }).select('admins')
        return ({success: true, error: {}, data: {obj}})
    }

    async getGroupMembers(groupId) {
        if (groupId === null || groupId === "") {
            return ({success: false, error: {message: 'Invalid route params !'}})
        }
        const response = await this.getGroupUserDetails(groupId)
        const members = response.data.membersArr
        if (members.length === 0) {
            return ({success: false, error: {message: response.error.message}})
        }
        return ({success: true, error: {}, data: {members}})
    }

    async updateMembersOfGroup(groupId, members) {
        const group = await GroupModel.findOne({
            _id: groupId
        })
        members.forEach((m) => {
            group.members.push({
                permissions: [],
                _id: m,
                isAdmin: false,
                adminLevel: 3
            })
        })
        await group.save()
        return ({success: true, error: {}, data: {}})
    }

    async createGroup(currentUser, groupDetailObj) {
        const temp = await this.getAdminGroups(currentUser)
        const groups = temp.data.obj
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].name === groupDetailObj.name) {
                return ({success: false, error: {message: 'A group with same name already exists !'}})
            }
        }
        let membersArr = [];
        groupDetailObj.members.forEach((e) => {
            membersArr.push({
                _id: mongoose.Types.ObjectId(e),
                isAdmin: false,
                permissions: [],
                adminLevel: 3
            })
        })
        membersArr.push({
            _id: mongoose.Types.ObjectId(currentUser._id),
            isAdmin: true,
            permissions: [],
            adminLevel: 1
        })
        const newGroup = new GroupModel({
            name: groupDetailObj.name,
            admins: [{_id: currentUser._id, level: 1}],
            members: membersArr
        })
        await newGroup.save()
        return ({success: true, error: {}, data: {}})
    }

    async getConversationBetweenUsers(currentUserId, secondUserId) {
        if (secondUserId === null || secondUserId === "") {
            return ({success: false, error: {message: 'Invalid req params !'}})
        }
        let a = currentUserId
        let b = secondUserId
        if (currentUserId > secondUserId) {
            [a, b] = [b, a]
        }
        const _result = await ConversationModel.findOne({
            between_users: [mongoose.Types.ObjectId(a), mongoose.Types.ObjectId(b)],
            conversation_type: 1
        })
        if (_result === null || _result.length === 0) {
            return ({success: false, error: {message: 'No Conversations so far !'}})
        } else {
            let messages = _result.messages
            return ({success: true, error: {}, messages: messages})
        }
    }

    async updateIndividualConversation(room, sender, receiver, text, message_type, media) {
        let msg_type = "", md_type = '', md_loc = '', text_ = ""

        if (message_type === "text") {
            msg_type = "text"
            text_ = text
        } else {
            msg_type = "media"
            if (media.type === "image") {
                md_type = "image"
                text_ = ""
                md_loc = text
            } else if (media.type === "pdf") {
                md_type = "pdf"
                text_ = ""
                md_loc = text
            } else if (media.type === "doc") {
                md_type = "doc"
                text_ = ""
                md_loc = text
            }
        }

        const conversation = await ConversationModel.findOne({between_users: room.name.split(",")})

        if (!conversation) {
            const newConversation = new ConversationModel({
                between_users: room.name.split(","),
                conversation_type: 1,
                messages: [{
                    text: text_,
                    message_type: msg_type,
                    media: {
                        type: md_type,
                        location: md_loc
                    },
                    sender: {
                        id: mongoose.Types.ObjectId(sender.id),
                        name: sender.name
                    },
                    sentAt: (moment().format('DD/MM/YY, h:mm A')).toString()
                }]
            })
            await newConversation.save()
        } else {
            const existingConversation = await ConversationModel.findOne({
                between_users: room.name.split(",")
            })
            existingConversation.messages.push({
                text: text_,
                message_type: msg_type,
                media: {
                    type: md_type,
                    location: md_loc
                },
                sender: {
                    id: mongoose.Types.ObjectId(sender.id),
                    name: sender.name
                },
                sentAt: (moment().format('DD/MM/YY, h:mm A')).toString()
            })
            await existingConversation.save()
        }
        return ({success: true, error: {}, data: {}})
    }

    async updateGroupConversation(room, sender, receiver, text, message_type, media) {
        let msg_type = "", md_type = '', md_loc = '', text_ = "", msg_status="pending";
        if (message_type === "text") {
            msg_type = "text"
            md_type = ""
            text_ = text
        } else {
            msg_type = "media"
            const group = await GroupModel.findOne({_id: receiver.id})
            const isPresent = group.admins.filter((obj) => obj._id == sender.id).length > 0
            if (isPresent) {
                msg_status = "approved"
            }
            if (media.type === "image") {
                md_type = "image"
                text_ = ""
                md_loc = text
            } else if (media.type === "pdf") {
                md_type = "pdf"
                text_ = ""
                md_loc = text
            } else if (media.type === "doc") {
                md_type = "doc"
                text_ = ""
                md_loc = text
            }
        }
        const conversation = await ConversationModel.findOne({group_id: mongoose.Types.ObjectId(receiver.id)})
        if (!conversation) {
            console.log("NO")
            const newConversation = new ConversationModel({
                between_users: [],
                group_id: room.id,
                conversation_type: 2,
                messages: [{
                    text: text_,
                    message_type: msg_type,
                    media: {
                        type: md_type,
                        location: md_loc
                    },
                    approval_status: msg_status,
                    sender: {
                        id: mongoose.Types.ObjectId(sender.id),
                        name: sender.name
                    },
                    sentAt: (moment().format('DD/MM/YY, h:mm A')).toString()
                }],

            })
            await newConversation.save()
        } else {
            console.log("YES")
            const existingConversation = await ConversationModel.findOne({
                group_id: mongoose.Types.ObjectId(receiver.id)
            })
            existingConversation.messages.push({
                text: text_,
                sender: {
                    id: mongoose.Types.ObjectId(sender.id),
                    name: sender.name
                },
                message_type: msg_type,
                media: {
                    type: md_type,
                    location: md_loc
                },
                approval_status: msg_status,
                sentAt: (moment().format('DD/MM/YY, h:mm A')).toString()
            })
            await existingConversation.save()
        }
        return ({success: true, error: {}, data: {}})
    }

    async getGroupConversations(groupId) {
        if (groupId === null || groupId === "") {
            return ({success: false, error: {message: 'Invalid req params !'}})
        }
        const _result = await ConversationModel.findOne({
            group_id: mongoose.Types.ObjectId(groupId),
            conversation_type: 2
        }).select('messages')
        if (!_result || _result.length === 0) {
            return ({success: false, error: {message: 'No Conversations so far !'}})
        } else {
            let messages = _result.messages
            return ({success: true, error: {}, data: {messages}})
        }
    }

    async getPendingGroupUploads(groupId) {
        if (groupId === null || groupId === "") {
            return ({success: false, error: {message: 'Invalid req params !'}})
        }
        const _result = await ConversationModel.findOne({
            group_id: mongoose.Types.ObjectId(groupId),
            conversation_type: 2
        }).select('messages')

        if (!_result || _result === null) {
            return ({success: false, error: {message: 'No conversation(s) !'}})
        } else {
            const messages = _result.messages
            const pending_messages = []
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].approval_status === "pending")
                    pending_messages.push(messages[i].toObject())
            }
            if (!pending_messages || pending_messages.length === 0) {
                return ({success: false, error: {message: 'No new request(s) so far !'}})
            } else {
                return ({success: true, error: {}, data: {pending_messages}})
            }
        }
    }

    async updatePendingGroupUploadStatus(groupId, msgId) {
        if (groupId === null || groupId === "" || msgId === null || msgId === "") {
            return ({success: false, error: {message: 'Invalid parameters !'}})
        }
        let _result = await ConversationModel.findOne({"messages._id": msgId})
        if (!_result || _result === null) {
            return ({success: false, error: {message: 'No such message found !'}})
        } else {
            let messageIndex = _result.messages.findIndex((m) => {
                return m._id == msgId
            })
            if (messageIndex > -1) {
                _result.messages[messageIndex].approval_status = "approved"
            }
            await _result.save()
            return ({success: true, error: {}, data: {}})
        }
    }


    // async findGroup(groupId){
    //     const _result = await GroupModel.findOne({
    //         _id:mongoose.Types.ObjectId(groupId)
    //     })
    //     if(_result){
    //         return ({success:false,error:{message:'No group found'}})
    //     }
    //     const groupObj = _result
    //     return ({success:true,error:{},data:{groupObj}})
    // }

    async updatePermissions(currentUserId, groupId, userId, permissions) {
        const group = await GroupModel.findOne({_id: groupId})
        const isPresent = group.admins.map((obj) => obj._id == currentUserId).length > 0
        if (!isPresent) {
            return ({success: false, error: {message: "You\'re not authorized "}})
        }
        const newAdmins = group.admins
        const newPermissions = (group.members.filter(m => m._id == userId)[0]).permissions
        const isUserAlreadyAdmin = newAdmins.filter((obj => obj._id == userId)).length > 0
        const _r = permissions

        if (_r.includes("Admin")) {
            if (!isUserAlreadyAdmin) {
                group.members.filter(m => m._id == userId)[0].isAdmin = true
                group.members.filter(m => m._id == userId)[0].adminLevel = 2
                newAdmins.push({
                    _id: mongoose.Types.ObjectId(userId),
                    level: 2
                })
            }
        } else if (_r.includes("~Admin")) {
            const index = newAdmins.findIndex(obj => obj._id == userId)
            if (index > -1) {
                newAdmins.splice(index, 1)
            }
            group.members.filter(m => m._id == userId)[0].isAdmin = false
            group.members.filter(m => m._id == userId)[0].adminLevel = 3
        }

        if (_r.includes("ReadOnly")) {
            if (!newPermissions.includes("ReadOnly"))
                newPermissions.push("ReadOnly")
        } else if (_r.includes("~ReadOnly")) {
            const index = newPermissions.indexOf("ReadOnly")
            if (index > -1) {
                newPermissions.splice(index, 1)
            }
        }

        if (_r.includes("BlockUploads")) {
            if (!newPermissions.includes("BlockUploads"))
                newPermissions.push("BlockUploads")
        } else if (_r.includes("~BlockUploads")) {
            const index = newPermissions.indexOf("BlockUploads")
            if (index > -1) {
                newPermissions.splice(index, 1)
            }
        }
        group.admins = newAdmins
        group.members.filter((m) => m._id == userId)[0].permissions = newPermissions
        await group.save()
        return ({success: true, error: {}, data: {}})
    }

    async getUserPermissions(userId, groupId) {
        let _result = await GroupModel.aggregate([
            {
                $unwind: "$members"
            },
            {
                $match:
                    {
                        "_id": mongoose.Types.ObjectId(groupId),
                        "members._id": mongoose.Types.ObjectId(userId)
                    }
            }])
        let permissions = {}
        permissions["isAdmin"] = _result[0].members.isAdmin
        if (_result[0].members.permissions === undefined) {
            permissions["ReadOnly"] = false
            permissions["BlockUploads"] = false
        } else {
            permissions["ReadOnly"] = _result[0].members.permissions.includes("ReadOnly")
            permissions["BlockUploads"] = _result[0].members.permissions.includes("BlockUploads")
        }
        return ({success: true, error: {}, data: {permissions}})
    }
}