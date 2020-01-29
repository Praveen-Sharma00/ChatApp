import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

export default [
    {path:'/login',component:Login,name:'Login'},
    {path:'/register',component: Register,name:'Register'},
    {path:'',redirect:{name:'Login'}}
]