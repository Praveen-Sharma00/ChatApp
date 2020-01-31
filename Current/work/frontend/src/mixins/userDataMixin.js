export default {
    methods:{
    },
    computed:{
        CurrentUser(){
            return this.$store.getters.getCurrentUser
        }
    }
}