export default [
    {
      path: "/landing",
      name: "LandingMain",
      component: () => import(/* webpackChunkName: "LandingMain" */ "@/modules/landing/views/Main.vue"),
    },
  ];
  