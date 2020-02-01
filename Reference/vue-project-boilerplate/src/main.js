import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import io      from 'socket.io-client'
import Socket  from './socket/socket'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVueIcons)

Vue.prototype.$eventHub = new Vue()
Vue.config.productionTip = false

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios
// Vue.prototype.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
Vue.prototype.$socket = Socket

new Vue({
    router,
    store,
    render: h => h(App),
    created(){ 
        this.$eventHub.$emit("LOADING",'true');
        Socket.close()
        if(localStorage.getItem('token')){
                //Verify The Token
        }else{
            let socket = io(`${this.$store.getters.GetProductionUrl}/admin`)
            Socket.init(socket)
            Socket.GENERATE_QR()
        }
    }
}).$mount('#app')


    // async created() {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         const baseUrl = 'http://localhost:3000'
    //         const result = await axios({url: baseUrl + '/verify', data: {token: token}, method: 'POST'})
    //         const response = result.data
    //         if (response.success) {
    //             Vue.prototype.$http.defaults.headers.common['Authorization'] = token
    //             if (this.$store.getters.isLoggedIn) {
    //                 this.$store.commit('init_user', response)
    //                 await this.$store.dispatch('GetAllUserGroups', this.$store.getters.getCurrentUser._id)
    //             }
    //         } else {
    //             await this.LogoutCurrentUser()
    //         }
    //     }
    // },