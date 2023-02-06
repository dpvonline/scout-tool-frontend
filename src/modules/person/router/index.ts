export default [
  {
    path: "/person",
    name: "PersonMain",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "PersonMain" */ "@/modules/person/views/Main.vue"),
  },
  {
    path: "/person/:id",
    name: "PersonDetail",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "PersonDetail" */ "@/modules/person/views/Person.vue"),
  }
]
