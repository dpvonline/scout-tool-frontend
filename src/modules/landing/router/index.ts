export default [
  {
    path: "/landing",
    name: "LandingMain",
    meta: {
      hideForAuth: true,
    },
    component: () => import(/* webpackChunkName: "LandingMain" */ "@/modules/landing/views/Main.vue"),
  },
  {
    path: "/faq-main",
    name: "FaqMain",
    component: () => import(/* webpackChunkName: "FaqMain" */ "@/modules/landing/views/FaqMain.vue"),
  },
  {
    path: "/impressum-main",
    name: "ImpressumMain",
    component: () => import(/* webpackChunkName: "ImpressumMain" */ "@/modules/landing/views/ImpressumMain.vue"),
  },
  {
    path: "/privacy-main",
    name: "PrivacyMain",
    component: () => import(/* webpackChunkName: "PrivacyMain" */ "@/modules/landing/views/PrivacyMain.vue"),
  },
];
