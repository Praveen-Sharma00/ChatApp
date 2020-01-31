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
router.beforeEach(async (to, from, next) => {
    if (to.path === '/auth/login') {
        if (!!localStorage.getItem('token')) {
            next('/dashboard')
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') !== null) {
            next()
        } else {
            next('/auth/login')
        }
    } else {
        next()
    }
})
