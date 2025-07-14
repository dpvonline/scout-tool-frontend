export default [
  {
    path: "/notification",
    name: "NotificationMain",
    redirect: { name: "AllNotification"},
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "TaskMain" */ "@/modules/notification/views/Main.vue"),
    children: [
      {
        path: "all-notification",
        name: "AllNotification",
        component: () =>
          import(/* webpackChunkName: "AllNotification" */ "@/modules/notification/views/tabs/AllNotification.vue"),
      },
    ],
  },
  {
    path: "/notification-detail/:id",
    name: "NotificationDetail",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "NotificationDetail" */ "@/modules/notification/views/NotificationDetail.vue"),
  },
];
