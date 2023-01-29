export default [
  {
    path: "/landing",
    name: "LandingMain",
    meta: {
      hideForAuth: true,
    },
    component: () => import(/* webpackChunkName: "LandingMain" */ "@/modules/landing/views/Main.vue"),
  },
];
