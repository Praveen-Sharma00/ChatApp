export default {
    methods: {
        async AuthenticateUser(obj) {
            await this.$store.dispatch('Authenticate', {
                type: obj.type,
                user: obj.user
            })

            if (this.$store.getters.getAuthStatus === 'failed') {
                return {success: false, message: this.$store.getters.getEventActionStatus}
            }
            return {success: true, message: "Successfully authenticated !"}
        }
    }
}