import axios from 'axios';

export default {
    state: {
        isMessageAreaActive: false,
        userId: null,
        currentRecipient: {},
        currentConversation: [],
        currentRoom: {},
        currentUploadedFile: {},
        userGroups: [],
        currentGroupAdmins: [],
        userPermissions: {},
        pendingApprovals: [],
        currentGroupMembers: []
    },
    getters: {
        GetMessageAreaState(state) {
            return state.isMessageAreaActive
        },
        GetCurrentRecipient(state) {
            return state.currentRecipient
        },
        GetCurrentConversation(state) {
            return state.currentConversation
        },
        GetCurrentRoom(state) {
            return state.currentRoom
        },
        GetUserGroupList(state) {
            return state.userGroups
        },
        GetCurrentUploadedFileDetails(state) {
            return state.currentUploadedFile
        },
        GetUserPermissions(state) {
            return state.userPermissions
        },
        GetCurrentGroupAdmins(state) {
            return state.currentGroupAdmins
        },
        GetPendingApprovals(state) {
            return state.pendingApprovals
        },
        GetGroupMembers(state) {
            return state.currentGroupMembers
        }
    },
    mutations: {
        SetMessageAreaState(state, payload) {
            state.isMessageAreaActive = payload
        },
        SetRecipientDetails(state, payload) {
            state.currentRecipient = {
                id: payload.id,
                name: payload.name,
                imageUrl: payload.imageUrl
            }
        },
        SetCurrentConversation(state, payload) {
            state.currentConversation = payload
        },
        SetCurrentRoom(state, payload) {
            state.currentRoom = payload
        },
        SetGroupList(state, payload) {
            state.userGroups = payload
        },
        UpdateUserGroups(state, payload) {
            state.userGroups.push(payload)
        },
        SetUploadedFileDetails(state, payload) {
            state.currentUploadedFile = payload
        },
        SetGroupMembers(state, payload) {
            state.currentGroupMembers = payload
        },
        UpdateGroupMembers(state, payload) {
            state.currentGroupMembers.push(payload)
        },
        InitUserPermissions(state, payload) {
            state.userPermissions = payload
        },
        InitGroupAdmins(state, payload) {
            state.currentGroupAdmins = payload
        },
        InitPendingUploads(state, payload) {
            state.pendingApprovals = payload
        }
    },
    actions: {
        async GetConversationBetweenUsers(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/user/chats/' + payload.id_a + '/' + payload.id_b,
                method: 'GET'
            })
            context.commit('SetCurrentConversation', response.data.messages)
        },
        async GetGroupConversations(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/chats/group/' + payload.id,
                method: 'GET'
            })
            context.commit('SetCurrentConversation', response.data.messages)
        },
        async GetAllUserGroups(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/user/' + payload + '/groups',
                method: 'GET'
            })
            context.commit('SetGroupList', response.data.groups)
        },
        async GetUserPermissions(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/user/' + payload.userId + '/group/' + payload.groupId + '/permissions',
                method: 'GET'
            })
            context.commit('InitUserPermissions', response.data.permissions)
        },
        async GetGroupAdmins(context, groupId) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/group/' + groupId + '/admins',
                method: 'GET'
            })
            context.commit('InitGroupAdmins', response.data.admins)
        },
        async GetPendingUploadApprovals(context, groupId) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/group/' + groupId + '/pending_uploads'
            })
            context.commit('InitPendingUploads', response.data.requests)
        },
        async CreateGroup(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/user/' + payload.userId + '/groups',
                method: 'POST',
                data: {
                    group_name: payload.group_name,
                    members: payload.members,
                    imageUrl: payload.imageUrl
                }
            })
            if (!response.data.success) {
                alert(response.data.error.message)
            } else {
                context.commit('UpdateUserGroups', response.data.newGroup)
                alert('Group created !')
            }
        },
        async GetGroupMembers(context, groupId) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/group/' + groupId + '/members',
                method: 'GET'
            })
            context.commit('SetGroupMembers', response.data.members)
        },
        async UpdateGroupMembers(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/group/' + payload.groupId + '/members',
                method: 'PUT',
                data: {
                    newMembers: payload.newMembers
                }
            })
            if (response.data.success) {
                alert('Members added successfully')
            } else {
                alert("There was a problem in adding members to group !")
            }
        },
        async UpdatePendingRequestStatus(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/group/' + payload.groupId + '/pending_uploads',
                method: 'PUT',
                data: {
                    request_status: payload.status
                }
            })
        },
        async UploadFile(context, payload) {
            const formData = new FormData()
            for (let i = 0; i < payload.length; i++) {
                formData.append("file", payload[i]);
            }
            let response = await axios.post(
                'http://localhost:3000/upload', formData
            )
            context.commit('SetUploadedFileDetails', {
                filenames: response.data.filename,
                media_types: response.data.media_type
            })
        }
    }
}