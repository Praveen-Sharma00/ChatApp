import axios from 'axios';

export default {
    state: {
        CurrentRecipient: {},
        CurrentConversationType: "individual",
        CurrentUserGroupList: [],
        Constants: {
            BASE_API_URL: 'http://localhost:3000/api/v1'
        }
    },
    getters: {
        getCurrentRecipient(state) {
            return state.CurrentRecipient
        },
        getCurrentConversationType(state) {
            return state.CurrentConversationType
        },
        getCurrentUserGroupList(state) {
            return state.CurrentUserGroupList
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
        }
    },
    actions: {
        async GetAllUserGroups(context, payload) {
            let response = await axios({
                url: context.getters.BASE_API_URL + '/user/' + payload + '/groups',
                method: 'GET'
            })
            context.commit('setCurrentUserGroupList', response.data.groups)
        }
    }
}