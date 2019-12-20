import UserModel from '../models/User'
import GroupModel from "../models/Group";
import ConversationModel from "../models/Conversation";

import mongoose from 'mongoose'
import Conversation from "../../../Bad-Design/src/models/Conversation";

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

    async getUserGroups(currentUser) {
        const {_id: userID} = currentUser
        const _result = await GroupModel.find({members: currentUser._id})
        if (!_result) {
            return ({success: false, error: {message: 'No Groups found !'}})
        } else {
            let obj = _result
            return ({success: true, error: {}, data: {obj}})
        }
    }

    async getAdminGroups(currentUser) {
        const {_id: userID} = currentUser
        const _result = await GroupModel.find({admins: currentUser._id})
        if (!_result) {
            return ({success: false, error: {message: 'No Groups found !'}})
        } else {
            let obj = _result
            return ({success: true, error: {}, data: {obj}})
        }
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
            membersArr.push(mongoose.Types.ObjectId(e))
        })
        membersArr.push(mongoose.Types.ObjectId(currentUser._id))
        const newGroup = new GroupModel({
            name: groupDetailObj.name,
            admins: [currentUser._id],
            members: membersArr
        })
        await newGroup.save()
        return ({success: true, error: {}, data: {}})
    }

    async getConversationBetweenUsers(currentUser, secondUserId) {
        if (secondUserId === null || secondUserId === "") {
            return ({success: false, error: {message: 'Invalid req params !'}})
        }
        const {_id: userID} = currentUser
        let a = currentUser._id, b = secondUserId;
        if (currentUser._id > secondUserId) {
            [a, b] = [b, a]
        }
        const _result = await ConversationModel.findOne({
            between_users: [mongoose.Types.ObjectId(a), mongoose.Types.ObjectId(b)],
            conversation_type: 1
        }).select('messages')
        if (!_result || _result.length === 0) {
            return ({success: false, error: {message: 'No Conversations so far !'}})
        } else {
            let messages = _result.messages
            return ({success: true, error: {}, data: {messages}})
        }
    }

    async updateIndividualConversation(senderId, receiverID, text) {
        const {name = senderName} = await UserModel.findOne({_id: mongoose.Types.ObjectId(senderId)})
        let a = senderId, b = receiverID;
        if (a > b) {
            [a, b] = [b, a]
        }
        const conversation = await ConversationModel.findOne({between_users: [mongoose.Types.ObjectId(a), mongoose.Types.ObjectId(b)]})
        if (!conversation) {
            const newConversation = new ConversationModel({
                between_users: [mongoose.Types.ObjectId(a), mongoose.Types.ObjectId(b)],
                conversation_type: 1,
                messages: [{
                    text: text,
                    sender: {
                        id: mongoose.Types.ObjectId(senderId),
                        name: senderName
                    },
                    timestamp: (moment().format('MMMM Do YYYY, h:mm A')).toString()
                }]
            })
            await newConversation.save()
        } else {
            const existingConversation = await ConversationModel.findOne({
                between_users: [a, b]
            })
            existingConversation.messages.push({
                text: text,
                sender: {
                    id: mongoose.Types.ObjectId(senderId),
                    name: senderName
                },
                timestamp: (moment().format('MMMM Do YYYY, h:mm A')).toString()
            })
            await existingConversation.save()
        }
        return ({success: true, error: {}, data: {}})
    }

    async updateGroupConversation(sender, groupId, text) {
        const conversation = await ConversationModel.findOne({group_id: mongoose.Types.ObjectId(groupId)})
        if (!conversation) {
            const newConversation = new ConversationModel({
                between_users: [],
                conversation_type: 2,
                messages: [{
                    text: text,
                    sender: {
                        id: mongoose.Types.ObjectId(sender._id),
                        name: sender.name
                    },
                    timestamp: (moment().format('MMMM Do YYYY, h:mm A')).toString()
                }]
            })
            await newConversation.save()
        } else {
            const existingConversation = await ConversationModel.findOne({
                group_id: mongoose.Types.ObjectId(groupId)
            })
            existingConversation.messages.push({
                text: text,
                sender: {
                    id: mongoose.Types.ObjectId(sender._id),
                    name: sender.name
                },
                timestamp: (moment().format('MMMM Do YYYY, h:mm A')).toString()
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
}