import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AuthMain from "../components/Auth/Main";

export default [
    {
        path: '/auth', component: AuthMain,
        children: [
            {path: 'login', component: Login,name:'Login'},
            {path: 'register',component: Register,name:'Register'}
        ]
    },
    {
        path: '*',redirect:'/auth/login'
    }
]