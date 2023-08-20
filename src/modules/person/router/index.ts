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
        path: "person-all",
        name: "AllPersons",
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "AllPersons" */ "@/modules/person/views/tabs/AllPersons.vue"),
      },
      {
        path: "user-all",
        name: "AllUsers",
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "AllUsers" */ "@/modules/person/views/tabs/AllUsers.vue"),
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
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "UserDetail" */ "@/modules/person/views/User.vue"),
  }
]
