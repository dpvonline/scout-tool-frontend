export default [
    {
      path: "/task",
      name: "TaskMain",
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "TaskMain" */ "@/modules/task/views/Main.vue"),
    },
    {
      path: "/task-detail/:id",
      name: "TaskDetail",
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "TaskDetail" */ "@/modules/task/views/TaskDetail.vue"),
    },
  ];
  