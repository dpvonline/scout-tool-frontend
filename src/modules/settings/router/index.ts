export default [
  {
    path: "/settings",
    name: "Settings",
    redirect: { name: "SettingsAllgemein" },
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "Settings" */ "@/modules/settings/views/Main.vue"),
    children: [
      {
        path: "general",
        name: "SettingsAllgemein",
        component: () => import(/* webpackChunkName: "SettingsAllgemein" */ "@/modules/settings/views/tabs/General.vue"),
      },
      {
        path: "password",
        name: "SettingsPassword",
        component: () => import(/* webpackChunkName: "SettingsPassword" */ "@/modules/settings/views/tabs/Password.vue"),
      },
      {
        path: "notifications",
        name: "SettingsNotifications",
        component: () => import(/* webpackChunkName: "SettingsNotifications" */ "@/modules/settings/views/tabs/Notifications.vue"),
      },
    ],
  },
];
