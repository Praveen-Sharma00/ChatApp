import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SocketIO from "./utils/socket";

export const $eventBus = new Vue()

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$socket = new SocketIO(store)

new Vue({
    router,
    store,
    async created() {
        const token = localStorage.getItem('token')
        if (token) {
            const response = await axios({url: 'http://localhost:3000/verify', data: {token: token}, method: 'POST'})
            const result = response.data
            if (result.success) {
                Vue.prototype.$http.defaults.headers.common['Authorization'] = token
                if (this.$store.getters.isLoggedIn) {
                    this.$store.commit('init_user', result)
                    await this.$store.dispatch('GetAllUserGroups', this.$store.getters.getUser._id)
                }
            } else {
                await this.$store.dispatch('logout')
            }
        }
    },
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
