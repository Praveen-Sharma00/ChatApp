export default {
    methods: {
        updateConversationType(c_type) {
            this.$store.commit('setCurrentConversationType', c_type)
        },
        getCurrentConversationType(){
            console.log("type :",this.$store.getters.getCurrentConversationType)
             let t=this.$store.getters.getCurrentConversationType
            return t;
        }
    },
    computed: {
        _CurrentUser() {
            return this.$store.getters.getCurrentUser
        },
        _CurrentUserGroupList(){
            return this.$store.getters.getCurrentUserGroupList
        }
    }
}