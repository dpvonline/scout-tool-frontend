export default [
  {
    path: "/register",
    name: "register",
    redirect: { name: "RegisterBasics" },
    component: () => import(/* webpackChunkName: "Register" */ "@/modules/auth/views/Main.vue"),
    children: [
      {
        path: "basics",
        name: "RegisterBasics",
        component: () => import(/* webpackChunkName: "RegisterBasics" */ "@/modules/auth/views/slides/Basics.vue"),
      },
      {
        path: "scout_details",
        name: "RegisterScoutDetails",
        component: () =>
          import(/* webpackChunkName: "RegisterScoutDetails" */ "@/modules/auth/views/slides/ScoutDetails.vue"),
      },
      {
        path: "personal_details",
        name: "RegisterPersonalDetails",
        component: () =>
          import(/* webpackChunkName: "RegisterPersonalDetails" */ "@/modules/auth/views/slides/PersonalDetails.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/modules/auth/views/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import(/* webpackChunkName: "Logout" */ "@/modules/auth/views/Logout.vue"),
  },
];
