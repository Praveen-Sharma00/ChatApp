import Vue from 'vue'
import VueRouter from 'vue-router'

import authRoutes from './auth';
import dashboardRoutes from './dashboard';

Vue.use(VueRouter)

const routes = [
    ...authRoutes,
    ...dashboardRoutes
]

const router = new VueRouter({
  routes
})

export default router
