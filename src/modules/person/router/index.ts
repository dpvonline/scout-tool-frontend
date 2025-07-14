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
    name: "PersonDetails",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "PersonDetails" */ "@/modules/person/components/person/PersonDetails.vue"),
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "UserDetails" */ "@/modules/person/views/User.vue"),
  },
  {
    path: "/new-excel",
    name: "newExcel",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "NewExcel" */ "@/modules/person/views/NewExcel.vue"),
  }
]
