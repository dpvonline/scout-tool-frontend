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
    path: "/landing-faq-main",
    name: "FaqMain",
    component: () => import(/* webpackChunkName: "FaqMain" */ "@/modules/landing/views/FaqMain.vue"),
  },
  {
    path: "/landing-impressum-main",
    name: "ImpressumMain",
    component: () => import(/* webpackChunkName: "ImpressumMain" */ "@/modules/landing/views/ImpressumMain.vue"),
  },
  {
    path: "/landing-privacy-main",
    name: "PrivacyMain",
    component: () => import(/* webpackChunkName: "PrivacyMain" */ "@/modules/landing/views/PrivacyMain.vue"),
  },
  {
    path: "/landing-contact-main",
    name: "ContactMain",
    component: () => import(/* webpackChunkName: "ContactMain" */ "@/modules/landing/views/ContactMain.vue"),
  },
  {
    path: "/map",
    name: "MapMain",
    component: () => import(/* webpackChunkName: "LandingMapMain" */ "@/modules/landing/views/MapMain.vue"),
  },
];
