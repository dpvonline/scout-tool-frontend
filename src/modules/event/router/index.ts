export default [
  {
    path: "/event",
    name: "EventMain",
    redirect: { name: "EventInvitations", query: { status: "pending" } },
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
    path: "/invitation-details/:id",
    name: "InvitationDetail",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "InvitationDetail" */ "@/modules/event/views/InvitationDetail.vue"),
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
  {
    path: "/registration-new/:id",
    name: "RegistrationNew",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "NewRegistration" */ "@/modules/event/views/newRegister/Container.vue"),
    children: [
      {
        path: "start",
        name: "RegistrationNewStart",
        component: () => import(/* webpackChunkName: "RegistrationNewStart" */ "@/modules/event/views/newRegister/module/Start.vue"),
      },
      {
        path: "person",
        name: "RegistrationNewPerson",
        component: () => import(/* webpackChunkName: "RegistrationNewPerson" */ "@/modules/event/views/newRegister/module/Person.vue"),
      },
      {
        path: "travel",
        name: "RegistrationNewTravel",
        component: () => import(/* webpackChunkName: "RegistrationNewTravel" */ "@/modules/event/views/newRegister/module/Travel.vue"),
      },
      {
        path: "free-text",
        name: "RegistrationNewFreeText",
        component: () => import(/* webpackChunkName: "RegistrationNewFreeText" */ "@/modules/event/views/newRegister/module/FreeText.vue"),
      },
      {
        path: "summary",
        name: "RegistrationNewSummary",
        component: () => import(/* webpackChunkName: "RegistrationNewSummary" */ "@/modules/event/views/newRegister/module/Summary.vue"),
      },
    ],
  },
  {
    path: "/registrations-finished",
    name: "RegistrationFinish",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "RegistrationFinish" */ "@/modules/event/views/newRegister/Finish.vue"),
  },
];
