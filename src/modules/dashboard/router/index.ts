export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      requiresAuth: true,
    },
    redirect: { name: "DashboardMain" },
    component: () => import(/* webpackChunkName: "Dashboard" */ "@/modules/dashboard/views/Main.vue"),
    children: [
      {
        path: "main",
        name: "DashboardMain",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "DashboardMain" */ "@/modules/dashboard/views/Main.vue"),
      },
    ],
  },
];
