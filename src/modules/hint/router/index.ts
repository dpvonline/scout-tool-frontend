export default [
  {
    path: "/hint",
    name: "HintMain",
    component: () => import(/* webpackChunkName: "HintMain" */ "@/modules/hint/views/Main.vue"),
  },
];
