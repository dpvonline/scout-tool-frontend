export default [
  {
    path: "/help",
    name: "HelpMain",
    redirect: { name: "AllHints" },
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "TaskMain" */ "@/modules/help/views/Main.vue"),
    children: [
      {
        path: "all-hints",
        name: "AllHints",
        component: () =>
          import(/* webpackChunkName: "AllTasks" */ "@/modules/help/views/tabs/AllHints.vue"),
      },
      {
        path: "/message-new-intern",
        name: "MessageNew3",
        meta: {
          requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "MessageNew3" */ "@/modules/message/components/NewMessageFormIntern.vue"),
      },
    ],
  },
];
