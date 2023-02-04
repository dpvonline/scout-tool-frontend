export default [
  {
    path: "/group",
    name: "GroupMain",
    meta: {
      requiresAuth: true,
    },
    redirect: { name: "MyGroups" },
    component: () => import(/* webpackChunkName: "GroupMain" */ "@/modules/group/views/Main.vue"),
    children: [
      {
        path: "my-groups",
        name: "MyGroups",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "GroupMember" */ "@/modules/group/views/tabs/MyGroups.vue"),
      },
      {
        path: "group-search",
        name: "GroupSearch",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "GroupSearch" */ "@/modules/group/views/tabs/GroupSearch.vue"),
      },
    ]
  },
  {
    path: "/group-details/:id",
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
        component: () => import(/* webpackChunkName: "GroupMember" */ "@/modules/group/views/detail/tabs/Member.vue"),
      },
      {
        path: "overview",
        name: "GroupOverview",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "GroupOverview" */ "@/modules/group/views/detail/tabs/Overview.vue"),
      },
      {
        path: "requests",
        name: "GroupRequests",
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "GroupRequests" */ "@/modules/group/views/detail/tabs/Requests.vue"),
      },
    ],
  },
];
