export default [
  {
    path: "/master-data",
    name: "MasterDataMain",
    redirect: { name: "EventOfTheWeek" },
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "MasterDataMain" */ "@/modules/masterData/views/Main.vue"),
    children: [
      {
        path: "heimabend-of-the-week",
        name: "EventOfTheWeek",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "EventOfTheWeek" */ "@/modules/masterData/views/tabs/EventOfTheWeek.vue"),
      },
    ]
  },
];
