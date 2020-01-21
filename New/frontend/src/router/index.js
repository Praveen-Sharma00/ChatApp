import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Chat from "../components/Chat/Chat";

Vue.use(VueRouter)

const index = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {
        path: '/chat', name: 'ChatRoute', component: Chat, meta: {
            requiresAuth: true
        }
    },
    {path: '*', redirect: '/login'}
]
const router = new VueRouter({
    routes: index
})

export default router

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        if (!!localStorage.getItem('token')) {
            next('/chat')
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') !== null) {
            next()
            return
        } else {
            next('/login')
        }
    } else {
        next()
    }
})