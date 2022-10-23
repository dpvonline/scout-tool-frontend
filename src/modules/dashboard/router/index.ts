export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: { name: "DashboardMain" },
    component: () => import(/* webpackChunkName: "Dashboard" */ "@/modules/dashboard/views/Main.vue"),
    children: [
      {
        path: "main",
        name: "DashboardMain",
        component: () => import(/* webpackChunkName: "DashboardMain" */ "@/modules/dashboard/views/Main.vue"),
      },
    ],
  },
];
