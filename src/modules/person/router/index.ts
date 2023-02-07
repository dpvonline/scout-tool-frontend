export default [
  {
    path: "/person",
    name: "PersonMain",
    meta: {
      requiresAuth: true
    },
    redirect: { name: "AllPersons" },
    component: () => import(/* webpackChunkName: "PersonMain" */ "@/modules/person/views/Main.vue"),
    children: [
      {
        path: "all",
        name: "AllPersons",
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "AllPersons" */ "@/modules/person/views/tabs/AllPersons.vue"),
      },
    ]
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
