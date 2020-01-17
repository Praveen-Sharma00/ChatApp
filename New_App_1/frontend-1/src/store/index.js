import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMessageAreaActive: false,
        userId: null,
        user: {},
        currentRecipient: {},
        currentConversation: {}
    },
    getters: {
        GetMessageAreaState(state) {
            return state.isMessageAreaActive
        }
    },
    mutations: {
        SetMessageAreaState(state, payload) {
            state.isMessageAreaActive = payload
        },
        SetUserContacts(state, payload) {
            state.user = {
                id: 2,
                contacts: payload
            }
            state.userId = this.state.user.id
        },
        SetRecipientDetails(state, payload) {
            state.currentRecipient = {
                id: payload.id,
                name: payload.name,
                imageUrl: payload.imageUrl
            }
        },

        InitConversations(state, payload) {
            state.currentConversation = payload
        }
    },
    actions: {
        fetchUserContacts(context) {
            context.commit('SetUserContacts', [{
                id: 1,
                name: 'Some name',
                imageUrl: 'https://p7.hiclipart.com/preview/4/1012/949/github-bitbucket-fork-software-repository-icons-for-windows-github-logo.jpg'
            }, {
                id: 3,
                name: 'Carl Rock',
                imageUrl: 'https://p7.hiclipart.com/preview/4/1012/949/github-bitbucket-fork-software-repository-icons-for-windows-github-logo.jpg'
            }])
        },
        fetchConversations(context, payload) {
            let conversations = [{
                between_users: [1, 2],
                conversation_type: 1,
                messages: [{
                    message_type: 'text',
                    text: 'Hello starting message !',
                    sender: {
                        id: 2,
                        name: 'A'
                    },
                    sentAt: 'January 8th 2020, 11:51 AM'
                }, {
                    message_type: 'text',
                    text: 'Next Message !',
                    sender: {
                        id: 2,
                        name: 'A'
                    },
                    sentAt: 'January 9th 2020, 11:51 AM'
                }, {
                    message_type: 'text',
                    text: 'Response 1 !',
                    sender: {
                        id: 1,
                        name: 'A'
                    },
                    sentAt: 'January 10th 2020, 11:51 AM'
                }]
            }, {
                between_users: [2, 3],
                conversation_type: 1,
                messages: [{
                    message_type: 'text',
                    text: 'Hello starting message !',
                    sender: {
                        id: 2,
                        name: 'A'
                    },
                    sentAt: '11:51 AM'
                }, {
                    message_type: 'text',
                    text: 'Next Message !',
                    sender: {
                        id: 3,
                        name: 'A'
                    },
                    sentAt: '11:51 AM'
                }]
            }]
            let a = context.state.user.id
            let b = context.state.currentRecipient.id
            let data = a > b ? [b, a] : [a, b]

            let r = conversations.find((e) => {
                return JSON.stringify(e.between_users) === JSON.stringify(data)
            })

            context.commit('InitConversations', r)
        }
    }
})
