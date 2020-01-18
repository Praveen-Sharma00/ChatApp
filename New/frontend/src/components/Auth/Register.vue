<template>

    <div class="card-body">
        <h5 class="card-title text-center">Sign up</h5>
        <form class="form-signin" @submit.prevent="register">
            <div class="form-label-group">
                <input type="text" v-model="name" id="inputName" class="form-control" placeholder="Your name" required
                       autofocus>
                <label for="inputName">Name</label>
            </div>
            <div class="form-label-group">
                <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address"
                       required autofocus>
                <label for="inputEmail">Email address</label>
            </div>
            <div class="form-label-group">
                <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password"
                       required>
                <label for="inputPassword">Password</label>
            </div>
            <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
            </div>
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign up</button>
            <div class="text-muted p-3 small">
                Already have an account ? <a href="http://localhost:8080/#/login">Login here</a>
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                email: '',
                password: '',
                name: ''
            }
        },
        methods: {
            async register() {
                let _email = this.email
                let _password = this.password
                let _name = this._name
                await this.$store.dispatch('register', {_email, _password, _name})
                this.$router.push('/chat')
            }
        }
    }
</script>

<style scoped>
    .card-title {
        margin-bottom: 2rem;
        font-weight: 300;
        font-size: 1.5rem;
    }

    .card-body {
        padding: 2rem;
    }

    .form-signin {
        width: 100%;
    }

    .form-signin .btn {
        font-size: 80%;
        border-radius: 5rem;
        letter-spacing: .1rem;
        font-weight: bold;
        padding: 1rem;
        transition: all 0.2s;
    }

    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .form-label-group input {
        height: auto;
        border-radius: 2rem;
    }

    .form-label-group > input,
    .form-label-group > label {
        padding: var(--input-padding-y) var(--input-padding-x);
    }

    .form-label-group > label {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        margin-bottom: 0;
        /* Override default `<label>` margin */
        line-height: 1.5;
        color: #495057;
        border: 1px solid transparent;
        border-radius: .25rem;
        transition: all .1s ease-in-out;
    }

    .form-label-group input::-webkit-input-placeholder {
        color: transparent;
    }

    .form-label-group input:-ms-input-placeholder {
        color: transparent;
    }

    .form-label-group input::-ms-input-placeholder {
        color: transparent;
    }

    .form-label-group input::-moz-placeholder {
        color: transparent;
    }

    .form-label-group input::placeholder {
        color: transparent;
    }

    .form-label-group input:not(:placeholder-shown) {
        padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
        padding-bottom: calc(var(--input-padding-y) / 3);
    }

    .form-label-group input:not(:placeholder-shown) ~ label {
        padding-top: calc(var(--input-padding-y) / 3);
        padding-bottom: calc(var(--input-padding-y) / 3);
        font-size: 12px;
        color: #777;
    }

    /* Fallback for Edge
    -------------------------------------------------- */

    @supports (-ms-ime-align: auto) {
        .form-label-group > label {
            display: none;
        }

        .form-label-group input::-ms-input-placeholder {
            color: #777;
        }
    }

    /* Fallback for IE
    -------------------------------------------------- */

    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        .form-label-group > label {
            display: none;
        }

        .form-label-group input:-ms-input-placeholder {
            color: #777;
        }
    }
</style>