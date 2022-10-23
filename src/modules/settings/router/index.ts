export default [
  {
    path: "/settings",
    name: "Settings",
    redirect: { name: "SettingsMain" },
    component: () => import(/* webpackChunkName: "Settings" */ "@/modules/settings/views/Main.vue"),
    children: [
      {
        path: "main",
        name: "SettingsMain",
        component: () => import(/* webpackChunkName: "SettingsMain" */ "@/modules/settings/views/Main.vue"),
      },
    ],
  },
];
