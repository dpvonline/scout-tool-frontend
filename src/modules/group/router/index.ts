export default [
  {
    path: "/group",
    name: "GroupMain",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "GroupMain" */ "@/modules/group/views/Main.vue"),
  },
  {
    path: "/group/:id",
    name: "GroupDetail",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "GroupDetail" */ "@/modules/group/views/GroupDetail.vue"),
    children: [
      {
        path: "member",
        name: "GroupMember",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "GroupMember" */ "@/modules/group/views/tabs/Member.vue"),
      },
      {
        path: "overview",
        name: "GroupOverview",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "GroupOverview" */ "@/modules/group/views/tabs/Overview.vue"),
      },
      {
        path: "requests",
        name: "GroupRequests",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "GroupRequests" */ "@/modules/group/views/tabs/Requests.vue"),
      },
    ],
  },
];
