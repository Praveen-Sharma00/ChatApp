import Dashboard from "../components/Dashboard/Dashboard";
import Chat from "../components/Dashboard/Chat/Chat";

export default [
    {
        path: '/dashboard', component: Dashboard,
        children: [
            {path:'chat',component:Chat}
        ]
    }
]