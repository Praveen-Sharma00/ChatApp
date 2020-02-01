export default {
    methods: {
        updateConversationType(c_type) {
            this.$store.commit('setCurrentConversationType', c_type)
        },
        getCurrentConversationType() {
            return this.$store.getters.getCurrentConversationType
        },
        updateRecipientDetails(data) {
            this.$store.commit('setRecipientDetails', data)
        },
        updateCurrentRoom(name, type) {
            this.$store.commit('setCurrentRoom', {name: name, type: type})
        },
        async getConversationBetweenUsers(id_a, id_b) {
            await this.$store.dispatch('GetConversationBetweenUsers', {
                id_a, id_b
            })
        },
        async getGroupConversations(id) {
            await this.$store.dispatch('GetGroupConversations', {_id: id})
        },
        async getCurrentUserPermission(userId, groupId) {
            await this.$store.dispatch('GetUserPermissions', {
                userId, groupId
            })
        }
    },
    computed: {
        _CurrentConversationType() {
            return this.$store.getters.getCurrentConversationType
        },
        _CurrentRoom(){
            return this.$store.getters.getCurrentRoom
        },
        _CurrentUser() {
            return this.$store.getters.getCurrentUser
        },
        _CurrentUserPermissions() {
            return this.$store.getters.getCurrentUserPermission
        },
        _CurrentRecipient() {
            return this.$store.getters.getCurrentRecipient
        },
        _CurrentUserGroupList() {
            return this.$store.getters.getCurrentUserGroupList
        },
        _CurrentConversation() {
            return this.$store.getters.getCurrentConversation
        },
        _BASE_URL() {
            return this.$store.getters.BASE_URL
        }
    }
}