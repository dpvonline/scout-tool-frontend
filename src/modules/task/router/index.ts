export default [
  {
    path: "/task",
    name: "TaskMain",
    redirect: { name: "AllTasks" },
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
