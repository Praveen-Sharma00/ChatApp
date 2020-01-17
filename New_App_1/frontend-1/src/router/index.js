import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Signup from "../components/Signup";

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: Home
//   }
//   // ,
//   // {
//   //   path: '/about',
//   //   name: 'about',
//   //   // route level code-splitting
//   //   // this generates a separate chunk (about.[hash].js) for this route
//   //   // which is lazy-loaded when the route is visited.
//   //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   // }
// ]
const routes=[
  {path:'/',component:Login},
  {path: '/register',component: Signup},
  {path:'/chat',component:Login}
]
const router = new VueRouter({
  routes
})

export default router
