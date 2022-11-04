export default [
  {
    path: "/person",
    name: "PersonMain",
    component: () => import(/* webpackChunkName: "PersonMain" */ "@/modules/person/views/Main.vue"),
  },
  {
    path: "/person/:id",
    name: "PersonDetails",
    component: () => import(/* webpackChunkName: "PersonDetails" */ "@/modules/person/views/Main.vue"),
  }
]
