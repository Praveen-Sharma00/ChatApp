import axios from 'axios'

export default {
    state: {
        isLoggedIn: !!localStorage.getItem('token'),
        status:'',
        token:localStorage.getItem('token') || '',
        user:{}
    },
    getters: {
        isLoggedIn: (state) => {
            return state.isLoggedIn
        },
        getErrorStatus:(state)=>{
            return state.status
        },
        getUser : (state)=>{
            return state.user
        }
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, payload) {
            state.status = 'success'
            state.token = payload.token
            state.user = payload.user
            state.isLoggedIn=true
        },
        auth_error(state,message) {
            state.status = message
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        async authenticate(context,data){
            context.commit('auth_request')
            let url=''
            if(data.type==="login"){
                url='http://localhost:3000/login'
            }else{
                url='http://localhost:3000/register'
            }
            const result = await axios({url:url,data :data.user, method :'POST'})
            const response=result.data
            if(response.success){
                const token = response.token
                const user = response.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                context.commit('auth_success', {token, user})
            }else{
                context.commit('auth_error',response.error.message)
                localStorage.removeItem('token')
            }
        }
    }
}