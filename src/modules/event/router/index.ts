export default [
  {
    path: "/event",
    name: "EventMain",
    redirect: { name: "EventInvitations", query: { status: "pending" } },
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "EventMain" */ "@/modules/event/views/Main.vue"),
    children: [
      {
        path: "invitations",
        name: "EventInvitations",
        component: () =>
          import(/* webpackChunkName: "EventInvitations" */ "@/modules/event/views/tabs/Invitations.vue"),
      },
      {
        path: "registrations",
        name: "EventRegistrations",
        component: () =>
          import(/* webpackChunkName: "EventRegistrations" */ "@/modules/event/views/tabs/Registrations.vue"),
      },
      {
        path: "planungsjurte",
        name: "EventPlanungsjurte",
        component: () =>
          import(/* webpackChunkName: "EventPlanungsjurte" */ "@/modules/event/views/tabs/Planungsjurte.vue"),
      },
    ],
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
        component: () =>
          import(/* webpackChunkName: "EventNewCustom" */ "@/modules/event/views/newEventStep/Custom.vue"),
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
    component: () =>
      import(/* webpackChunkName: "RegistrationsDetail" */ "@/modules/event/views/RegistrationsDetail.vue"),
  },
  {
    path: "/registrations-details-statistic/:id",
    name: "RegistrationsDetailStatistic",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "RegistrationsDetailStatistic" */ "@/modules/event/views/RegistrationsDetailStatistic.vue"
      ),
  },
  {
    path: "/registration-new/:id",
    name: "RegistrationNew",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "NewRegistration" */ "@/modules/event/views/newRegister/Container.vue"),
    children: [
      {
        path: "introduction",
        name: "RegistrationIntroduction",
        component: () =>
          import(/* webpackChunkName: "RegistrationIntroduction" */ "@/modules/event/views/newRegister/module/Introduction.vue"),
      },
      {
        path: "participants",
        name: "RegistrationParticipants",
        component: () =>
          import(/* webpackChunkName: "RegistrationParticipants" */ "@/modules/event/views/newRegister/module/Participants.vue"),
      },
      {
        path: "travel",
        name: "RegistrationTravel",
        component: () =>
          import(/* webpackChunkName: "RegistrationTravel" */ "@/modules/event/views/newRegister/module/Travel.vue"),
      },
      {
        path: "travel-back",
        name: "RegistrationTravelBack",
        component: () =>
          import(/* webpackChunkName: "RegistrationTravelBack" */ "@/modules/event/views/newRegister/module/Travel.vue"),
      },
      {
        path: "letter",
        name: "RegistrationLetter",
        component: () =>
          import(
            /* webpackChunkName: "RegistrationLetter" */ "@/modules/event/views/newRegister/module/Letter.vue"
          ),
      },
      {
        path: "custom/:module:",
        name: "RegistrationCustom",
        component: () =>
          import(
            /* webpackChunkName: "RegistrationCustom" */ "@/modules/event/views/newRegister/module/Custom.vue"
          ),
      },
      {
        path: "summary",
        name: "RegistrationSummary",
        component: () =>
          import(
            /* webpackChunkName: "RegistrationSummary" */ "@/modules/event/views/newRegister/module/Summary.vue"
          ),
      },
    ],
  },
  {
    path: "/registration-finished/:id",
    name: "RegistrationFinish",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "RegistrationFinish" */ "@/modules/event/views/newRegister/Finish.vue"),
  },
  {
    path: "/event-payment-details/:id",
    name: "EventPaymentDetails",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "EventPaymentDetails" */ "@/modules/event/views/payments/PaymentDetails.vue"),
  },
  {
    path: "/event-statistic/:id",
    name: "EventStatistic",
    meta: {
      requiresAuth: true,
    },
    redirect: { name: "EventStatisticSummary" },
    component: () => import(/* webpackChunkName: "NewRegistration" */ "@/modules/event/views/statistic/Main.vue"),
    children: [
      {
        path: "summary",
        name: "EventStatisticSummary",
        component: () =>
          import(/* webpackChunkName: "EventStatisticSummary" */ "@/modules/event/views/statistic/module/Summary.vue"),
      },
      {
        path: "registration",
        name: "EventStatisticRegistration",
        component: () =>
          import(
            /* webpackChunkName: "EventStatisticRegistration" */ "@/modules/event/views/statistic/module/Registration.vue"
          ),
      },
      {
        path: "results",
        name: "EventStatisticResults",
        component: () =>
          import(/* webpackChunkName: "EventStatisticResults" */ "@/modules/event/views/statistic/module/Results.vue"),
      },
      {
        path: "attributes",
        name: "EventStatisticAttributes",
        component: () =>
          import(
            /* webpackChunkName: "EventStatisticAttributes" */ "@/modules/event/views/statistic/module/Attributes.vue"
          ),
      },
      {
        path: "actions",
        name: "EventStatisticDownloads",
        component: () =>
          import(
            /* webpackChunkName: "EventStatisticDownloads" */ "@/modules/event/views/statistic/module/Downloads.vue"
          ),
      },
      {
        path: "payments",
        name: "EventStatisticPayments",
        component: () =>
          import(
            /* webpackChunkName: "EventStatisticPayments" */ "@/modules/event/views/statistic/module/Payments.vue"
          ),
      },
      {
        path: "persons",
        name: "EventStatisticPersons",
        component: () =>
          import(/* webpackChunkName: "EventStatisticPersons" */ "@/modules/event/views/statistic/module/Persons.vue"),
      },
      {
        path: "maps",
        name: "EventStatisticMaps",
        component: () =>
          import(/* webpackChunkName: "EventStatisticMaps" */ "@/modules/event/views/statistic/module/Maps.vue"),
      },
      {
        path: "mail",
        name: "EventStatisticMail",
        component: () =>
          import(/* webpackChunkName: "EventStatisticMail" */ "@/modules/event/views/statistic/module/Mail.vue"),
      },
    ],
  },
];
