import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SocketIO from "./utils/socket";

Vue.config.productionTip = false
Vue.prototype.$socket = new SocketIO(store);
export const eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
