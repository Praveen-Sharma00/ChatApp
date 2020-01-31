<template>
    <div>
        <h5 class="card-title text-center">Sign up</h5>
        <form class="form-signin" @submit.prevent="register()">
            <div class="form-label-group">
                <input type="text" v-model="name" id="inputName" class="form-control"
                       placeholder="Your name"
                       required
                       autofocus>
                <label for="inputName">Name</label>
            </div>
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
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign up
            </button>
            <div class="text-muted p-3 small">
                Already have an account ?
                <router-link :to="{name:'Login'}">Login here</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import authMixin from "../../mixins/authMixin";

    export default {
        name: "Register",
        data() {
            return {
                email: '',
                password: '',
                name: ''
            }
        },
        beforeCreate() {
            document.body.className = 'auth'
        },
        mixins: [authMixin],
        methods: {
            async register() {
                let response = await this.AuthenticateUser({
                    type: "register",
                    user: {
                        name: this.name,
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
        }
    }
</script>

<style scoped>
   @import "main.css";
</style>