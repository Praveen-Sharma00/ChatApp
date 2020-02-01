import Vue from "vue"
import Router from "vue-router"
import { publicRoute, protectedRoute } from "./config"

const routes = publicRoute.concat(protectedRoute)
import store  from '../store'

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes
})

router.beforeEach(async (to, from, next) => {

    const PublicPages  = ['Login'];
    const AuthRequired = !PublicPages.includes(to.name);
    let loggedIn       = localStorage.getItem('token')
    if (AuthRequired && !loggedIn) {

        return next('/login');

    }else if(!AuthRequired && loggedIn){

        return next('/')
    }
    next();

})

export default router
