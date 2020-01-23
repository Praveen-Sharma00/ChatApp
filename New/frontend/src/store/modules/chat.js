import axios from 'axios';

export default {
    state: {
        isMessageAreaActive: false,
        userId: null,
        currentRecipient: {},
        currentConversation: [],
        currentRoom: {},
        currentUploadedFile:{},
        userGroups: []
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
        GetCurrentUploadedFileDetails(state){
            return state.currentUploadedFile
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
        SetUploadedFileDetails(state,payload){
            state.currentUploadedFile = payload
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
            console.log(response)
            context.commit('SetCurrentConversation', response.data.messages)
        },
        async GetAllUserGroups(context, payload) {
            let response = await axios({
                url: 'http://localhost:3000/api/v1/user/' + payload + '/groups',
                method: 'GET'
            })
            context.commit('SetGroupList', response.data.groups)
        },
        async UploadFile(context,payload){
            let response = await axios.post(
                'http://localhost:3000/upload',payload
            )
            console.log(response)
            context.commit('SetUploadedFileDetails',{
                filenames:response.data.filename,
                media_types:response.data.media_type
            })
        }
    }
}