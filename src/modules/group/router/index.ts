export default [
  {
    path: "/group",
    name: "GroupMain",
    component: () => import(/* webpackChunkName: "groupMain" */ "@/modules/group/views/Main.vue"),
  },
  {
    path: "/group/:id",
    name: "GroupDetail",
    redirect: { name: 'GroupChilden', params: { id: 1}},
    component: () => import(/* webpackChunkName: "GroupDetail" */ "@/modules/group/views/GroupDetail.vue"),
    children: [
      {
        path: "children",
        name: "GroupChilden",
        component: () => import(/* webpackChunkName: "GroupChilden" */ "@/modules/group/views/tabs/Children.vue"),
      },
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
