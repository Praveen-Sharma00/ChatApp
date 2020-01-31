import axios from 'axios'

export default {
    state: {
        IsLoggedIn: !!localStorage.getItem('token'),
        ActionStatus: '',
        AuthStatus: '',
        Token: localStorage.getItem('token') || '',
        CurrentUser: {}
    },
    getters: {
        getLoginStatus: (state) => {
            return state.IsLoggedIn
        },
        getEventActionStatus: (state) => {
            return state.ActionStatus
        },
        getCurrentUser: (state) => {
            return state.CurrentUser
        },
        getAuthStatus: (state) => {
            return state.AuthStatus
        }
    },
    mutations: {
        auth_request(state) {
            state.ActionStatus = 'loading'
        },
        auth_success(state, payload) {
            state.ActionStatus = 'success'
            state.Token = payload.token
            state.CurrentUser = payload.user
            state.IsLoggedIn = true
            state.AuthStatus = "success"
        },
        init_user(state, payload) {
            state.CurrentUser = payload.user
        },
        auth_error(state, message) {
            state.ActionStatus = message
            state.AuthStatus = "failed"
        },
        logout(state) {
            state.ActionStatus = ''
            state.Token = ''
        },
    },
    actions: {
        async Authenticate(context, data) {
            context.commit('auth_request')
            let response;
            let baseUrl = 'http://localhost:3000'
            let url = ''
            if (data.type === "login") {
                url = baseUrl + '/login'
            } else {
                url = baseUrl + '/register'
            }
            response = await axios({url: url, data: data.user, method: 'POST'})
            const result = response.data
            if (result.success) {
                const token = result.token
                const user = result.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                context.commit('auth_success', {token, user})
            } else {
                context.commit('auth_error', result.error.message)
                localStorage.removeItem('token')
            }
        },
        logout(context) {
            context.commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        }
    }
}