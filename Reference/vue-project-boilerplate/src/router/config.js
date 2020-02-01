import { AuthLayout, DefaultLayout } from "../components/Layouts"
  
  export const publicRoute = [{
      path: "*",
      component: () => import("@/views/error/NotFound.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: AuthLayout,
      meta: {
        title: "Login"
      },
    }
  ]
  
  export const protectedRoute = [{
    path: "/",
    component: DefaultLayout,
    meta: {
      title: "Dashboard",
      group: "apps",
      icon: ""
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "home",
          group: "apps",
          icon: "message"
        },
        component: () => import("@/views/Home.vue")
      },
      {
        path: "/addrfq",
        name: "Add RFQ",
        meta: {
          title: "Add RFQ",
          group: "apps",
          icon: "message"
        },
        component: () => import("@/views/AddRFQ.vue")
      },
      {
        path: "/respondrfq",
        name: "Respond RFQ",
        meta: {
          title: "Respond RFQ",
          group: "apps",
          icon: "message"
        },
        component: () => import("@/views/RespondRFQ.vue")
      },
      {
        path: "/chat",
        name: "Chat",
        meta: {
          title: "Chat",
          group: "apps",
          icon: "message"
        },
        component: () => import("@/views/Chat.vue")
      },
    ]
  }]