export default [
    {
      path: "/task",
      name: "TaskMain",
      component: () => import(/* webpackChunkName: "TaskMain" */ "@/modules/task/views/Main.vue"),
    },
  ];
  