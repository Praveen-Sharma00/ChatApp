import axios from 'axios';

export default {
    state: {
        isMessageAreaActive: false,
        userId: null,
        currentRecipient: {},
        currentConversation: [],
        currentRoom: {},
        userGroups:[]
    },
    getters: {
        GetMessageAreaState(state) {
            return state.isMessageAreaActive
        },
        GetCurrentRecipient(state) {
            console.log("REC : ",state.currentRecipient)
            return state.currentRecipient
        },
        GetCurrentConversation(state) {
            return state.currentConversation
        },
        GetCurrentRoom(state) {
            return state.currentRoom
        },
        GetUserGroupList(state){
            return state.userGroups
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
        SetGroupList(state,payload){
            state.userGroups = payload
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
        async GetAllUserGroups(context,payload){
            console.log("USER ID : ",payload)
            let response = await axios({
                url:'http://localhost:3000/api/v1/user/'+payload+'/groups',
                method:'GET'
            })
            console.log(response)
            context.commit('SetGroupList',response.data.groups)
        }
    }
}