export default [
  {
    path: "/message",
    name: "MessageMain",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "MessageMain" */ "@/modules/message/views/Main.vue"),
  },
  {
    path: "/message-details/:id",
    name: "MessageDetail",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "MessageDetail" */ "@/modules/message/views/MessageDetail.vue"),
  },
  {
    path: "/message-new",
    name: "MessageNew",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "MessageNew" */ "@/modules/message/views/NewMessage.vue"),
  },
  {
    path: "/message-edit/:id",
    name: "MessageEdit",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "MessageEdit" */ "@/modules/message/views/EditMessage.vue"),
  }
];
