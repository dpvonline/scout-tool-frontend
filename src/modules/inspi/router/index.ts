export default [
  {
    path: "/inspi",
    name: "InspiMain",
    redirect: { name: "ActivityOfTheWeek" },
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "InspiMain" */ "@/modules/inspi/views/Main.vue"),
    children: [
      {
        path: "heimabend-of-the-week",
        name: "ActivityOfTheWeek",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "ActivityOfTheWeek" */ "@/modules/inspi/views/tabs/ActivityOfWeek.vue"),
      },
    ]
  },
];
