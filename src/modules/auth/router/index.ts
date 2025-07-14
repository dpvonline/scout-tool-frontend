export default [
  {
    path: "/register",
    name: "register",
    redirect: { name: "RegisterStart" },
    component: () => import(/* webpackChunkName: "Register" */ "@/modules/auth/views/Main.vue"),
    children: [
      {
        path: "start",
        name: "RegisterStart",
        component: () => import(/* webpackChunkName: "RegisterStart" */ "@/modules/auth/views/slides/Start.vue"),
      },
      {
        path: "basics",
        name: "RegisterBasics",
        component: () => import(/* webpackChunkName: "RegisterBasics" */ "@/modules/auth/views/slides/Basics.vue"),
      },
      {
        path: "scout-details",
        name: "RegisterScoutDetails",
        component: () =>
          import(/* webpackChunkName: "RegisterScoutDetails" */ "@/modules/auth/views/slides/ScoutDetails.vue"),
      },
      {
        path: "personal-details",
        name: "RegisterPersonalDetails",
        component: () =>
          import(/* webpackChunkName: "RegisterPersonalDetails" */ "@/modules/auth/views/slides/PersonalDetails.vue"),
      },
      {
        path: "personal-advanced",
        name: "RegisterAdvanced",
        component: () =>
          import(/* webpackChunkName: "RegisterAdvanced" */ "@/modules/auth/views/slides/Advanced.vue"),
      },
    ],
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import(/* webpackChunkName: "Logout" */ "@/modules/auth/views/Logout.vue"),
  },
  {
    path: "/register-complete",
    name: "RegComplete",
    component: () => import(/* webpackChunkName: "RegComplete" */ "@/modules/auth/views/RegComplete.vue"),
  },
];
