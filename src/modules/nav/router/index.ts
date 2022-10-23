export default [
  {
    path: "/",
    name: "home",
    redirect: { name: "DashboardMain" },
    component: () => import(/* webpackChunkName: "home" */ "@/modules/app/AppMain.vue"),
  },
];
