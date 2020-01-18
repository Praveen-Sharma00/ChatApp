import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

Vue.use(VueRouter)

const index=[
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'*',redirect:'/login'}
]
const router = new VueRouter({
    routes: index
})

export default router
