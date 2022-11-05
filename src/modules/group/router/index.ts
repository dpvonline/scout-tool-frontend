export default [
  {
    path: "/group",
    name: "GroupMain",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "groupMain" */ "@/modules/group/views/Main.vue"),
  },
  {
    path: "/group/:id",
    name: "GroupDetail",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "GroupDetail" */ "@/modules/group/views/GroupDetail.vue"),
    children: [
      {
        path: "member",
        name: "GroupMember",
        component: () => import(/* webpackChunkName: "GroupMember" */ "@/modules/group/views/tabs/Member.vue"),
      },
      {
        path: "overview",
        name: "GroupOverview",
        component: () => import(/* webpackChunkName: "GroupOverview" */ "@/modules/group/views/tabs/Overview.vue"),
      },
    ],
  },
]
