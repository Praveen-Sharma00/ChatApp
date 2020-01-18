import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Test from "../components/Chat/Test";

Vue.use(VueRouter)

const index = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {
        path: '/test', component: Test, meta: {
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
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})