export default [
  {
    path: "/support",
    name: "SupportMain",
    component: () => import(/* webpackChunkName: "SupportMain" */ "@/modules/support/views/Main.vue"),
  },
];
