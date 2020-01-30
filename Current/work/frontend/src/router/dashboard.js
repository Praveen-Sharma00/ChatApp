import Dashboard from "../components/Dashboard/Dashboard";
import Chat from "../components/Dashboard/Chat/Chat";
import DefaultPage from "../components/Dashboard/Default";

export default [
    {
        path: '/dashboard', component: Dashboard,
        children: [
            {path:'chat',component:Chat},
            {path:'main',component:DefaultPage}
        ]
    }
]