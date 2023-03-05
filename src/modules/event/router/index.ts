export default [
  {
    path: "/event",
    name: "EventMain",
    redirect: { name: "EventInvitations" },
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "EventMain" */ "@/modules/event/views/Main.vue"),
    children: [
      {
        path: "invitations",
        name: "EventInvitations",
        component: () => import(/* webpackChunkName: "EventInvitations" */ "@/modules/event/views/tabs/Invitations.vue"),
      },
      {
        path: "registrations",
        name: "EventRegistrations",
        component: () => import(/* webpackChunkName: "EventRegistrations" */ "@/modules/event/views/tabs/Registrations.vue"),
      },
      {
        path: "planungsjurte",
        name: "EventPlanungsjurte",
        component: () => import(/* webpackChunkName: "EventPlanungsjurte" */ "@/modules/event/views/tabs/Planungsjurte.vue"),
      },
    ]
  },
  {
    path: "/event-details/:id",
    name: "EventDetail",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "EventDetail" */ "@/modules/event/views/EventDetail.vue"),
  },
  {
    path: "/event-new",
    name: "EventNew",
    redirect: { name: "EventNewStart" },
    component: () => import(/* webpackChunkName: "EventNew" */ "@/modules/event/views/EventNew.vue"),
    children: [
      {
        path: "start",
        name: "EventNewStart",
        component: () => import(/* webpackChunkName: "EventNewStart" */ "@/modules/event/views/newEventStep/Start.vue"),
      },
      {
        path: "names",
        name: "EventNewNames",
        component: () => import(/* webpackChunkName: "EventNewNames" */ "@/modules/event/views/newEventStep/Names.vue"),
      },
      {
        path: "dates",
        name: "EventNewDates",
        component: () => import(/* webpackChunkName: "EventNewDates" */ "@/modules/event/views/newEventStep/Dates.vue"),
      },
      {
        path: "auth",
        name: "EventNewAuth",
        component: () => import(/* webpackChunkName: "EventNewAuth" */ "@/modules/event/views/newEventStep/Auth.vue"),
      },
      {
        path: "custom",
        name: "EventNewCustom",
        component: () => import(/* webpackChunkName: "EventNewCustom" */ "@/modules/event/views/newEventStep/Custom.vue"),
      },
    ],
  },
  {
    path: "/event-edit/:id",
    name: "EventEdit",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "EventEdit" */ "@/modules/event/views/EventEdit.vue"),
  },
  {
    path: "/registrations-details/:id",
    name: "RegistrationsDetail",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "RegistrationsDetail" */ "@/modules/event/views/RegistrationsDetail.vue"),
  },
];
