<template>
    <div>
        <h5 class="card-title text-center">Sign In</h5>
        <form class="form-signin" @submit.prevent="login()">
            <div class="form-label-group">
                <input type="email" v-model="email" id="inputEmail" class="form-control"
                       placeholder="Email address"
                       required autofocus>
                <label for="inputEmail">Email address</label>
            </div>
            <div class="form-label-group">
                <input type="password" v-model="password" id="inputPassword" class="form-control"
                       placeholder="Password"
                       required>
                <label for="inputPassword">Password</label>
            </div>
            <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
            </div>
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in
            </button>
            <div class="text-muted p-3 small">
                Don't have an account ?
                <router-link :to="{name:'Register'}">Register here</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import authMixin from "../../mixins/authMixin";

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: ''
            }
        },
        beforeCreate() {
            document.body.className = 'auth'
        },
        mixins: [authMixin],
        methods: {
            async login() {
                let response = await this.AuthenticateUser({
                    type: "login",
                    user: {
                        email: this.email,
                        password: this.password
                    }
                })
                if (response.success) {
                    this.$router.push('/dashboard/chat')
                } else {
                    alert(response.message)
                }
            }
        },
        computed: {}
    }
</script>

<style scoped>
    @import "style.css";
</style>