export default [
  {
    path: "/task",
    name: "TaskMain",
    redirect: { name: "AllTasks", query: { status: "offen" } },
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "TaskMain" */ "@/modules/task/views/Main.vue"),
    children: [
      {
        path: "all-tasks",
        name: "AllTasks",
        component: () =>
          import(/* webpackChunkName: "AllTasks" */ "@/modules/task/views/tabs/AllTasks.vue"),
      },
      {
        path: "my-requested-tasks",
        name: "MyRequestedTasks",
        component: () =>
          import(/* webpackChunkName: "MyRequestedTasks" */ "@/modules/task/views/tabs/MyRequestedTasks.vue"),
      },
      {
        path: "new-messages",
        name: "NewMessages",
        component: () =>
          import(/* webpackChunkName: "NewMessages" */ "@/modules/message/views/tabs/NewMessages.vue"),
      },
    ],
  },
  {
    path: "/task-detail/:id",
    name: "TaskDetail",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "TaskDetail" */ "@/modules/task/views/TaskDetail.vue"),
  },
];
