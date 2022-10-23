export default [
  {
    path: "/faq",
    name: "faq",
    redirect: { name: "FaqMain" },
    component: () => import(/* webpackChunkName: "FaqMain" */ "@/modules/faq/views/Main.vue"),
    children: [
      {
        path: "main",
        name: "FaqMain",
        component: () => import(/* webpackChunkName: "FaqMain" */ "@/modules/faq/views/Main.vue"),
      },
    ],
  },
];
