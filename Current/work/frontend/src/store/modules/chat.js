import axios from 'axios';

export default {
    state: {
        CurrentRecipient: {},
        CurrentRoom: {},
        CurrentConversationType: "individual",
        CurrentUserGroupList: [],
        CurrentConversation: [],

        Constants: {
            BASE_API_URL: 'http://localhost:3000/api/v1'
        }
    },
    getters: {
        getCurrentRecipient(state) {
            return state.CurrentRecipient
        },
        getCurrentRoom(state){
            return state.CurrentRoom
        },
        getCurrentConversationType(state) {
            return state.CurrentConversationType
        },
        getCurrentUserGroupList(state) {
            return state.CurrentUserGroupList
        },
        getCurrentConversation(state){
            return state.CurrentConversation
        },
        BASE_API_URL(state) {
            return state.Constants.BASE_API_URL
        }

    },
    mutations: {
        setRecipientDetails(state, payload) {
            state.CurrentRecipient = {
                _id: payload._id,
                name: payload.name,
                imageUrl: payload.imageUrl
            }
        },
        setCurrentConversationType(state, payload) {
            state.CurrentConversationType = payload
        },
        setCurrentUserGroupList(state, payload) {
            state.CurrentUserGroupList = payload
        },
        setCurrentRoom(state, payload) {
            state.CurrentRoom = payload
        },
        setCurrentConversation(state,payload){
            state.CurrentConversation=payload
        }
    },
    actions: {
        async GetAllUserGroups(context, payload) {
            let response = await axios({
                url: context.getters.BASE_API_URL + '/user/' + payload + '/groups',
                method: 'GET'
            })
            context.commit('setCurrentUserGroupList', response.data.groups)
        },
        async GetConversationBetweenUsers(context, payload) {
            let response = await axios({
                url: context.getters.BASE_API_URL + '/user/chats/' + payload.id_a + '/' + payload.id_b,
                method: 'GET'
            })
            context.commit('setCurrentConversation', response.data.messages)
        },
        async GetGroupConversations(context, payload) {
            let response = await axios({
                url: context.getters.BASE_API_URL + '/chats/group/' + payload._id,
                method: 'GET'
            })
            context.commit('setCurrentConversation', response.data.messages)
        },
    }
}