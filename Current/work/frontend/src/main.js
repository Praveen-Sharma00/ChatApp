import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import authMixin from "./mixins/authMixin";

export const eventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
    router,
    store,
    mixins: [authMixin],
    async created() {
        const token = localStorage.getItem('token')
        if (token) {
            const baseUrl = 'http://localhost:3000'
            const result = await axios({url: baseUrl + '/verify', data: {token: token}, method: 'POST'})
            const response = result.data
            if (response.success) {
                Vue.prototype.$http.defaults.headers.common['Authorization'] = token
                if (this.$store.getters.isLoggedIn) {
                    this.$store.commit('init_user', response)
                    await this.$store.dispatch('GetAllUserGroups', this.$store.getters.getCurrentUser._id)
                }
            } else {
                await this.LogoutCurrentUser()
            }
        }
    },
    render: h => h(App)
}).$mount('#app')
