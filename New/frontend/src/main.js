import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios;

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
