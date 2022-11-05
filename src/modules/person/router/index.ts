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
    name: "PersonDetails",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "PersonDetails" */ "@/modules/person/views/Main.vue"),
  }
]
