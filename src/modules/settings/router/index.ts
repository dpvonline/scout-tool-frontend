export default [
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "Settings" */ "@/modules/settings/views/Main.vue"),
  },
];
