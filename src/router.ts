import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/modules/auth/store";

import AppRouter from "@/modules/app/router";
import DashboardRouter from "@/modules/dashboard/router";
import SettingsRouter from "@/modules/settings/router";
import AuthRouter from "@/modules/auth/router";
import GroupRouter from "@/modules/group/router";
import PersonRouter from "@/modules/person/router";
import LandingMain from "@/modules/landing/router";
import TaskRouter from "@/modules/task/router";
import MessageRouter from "@/modules/message/router";
import EventRouter from "@/modules/event/router";
import InspiRouter from "@/modules/inspi/router";
import HelpMain from "@/modules/help/router";
import NotificationMain from "@/modules/notification/router";

const routes = [
  ...DashboardRouter,
  ...AppRouter,
  ...SettingsRouter,
  ...AuthRouter,
  ...GroupRouter,
  ...PersonRouter,
  ...LandingMain,
  ...TaskRouter,
  ...MessageRouter,
  ...EventRouter,
  ...InspiRouter,
  ...HelpMain,
  ...NotificationMain,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

function sleep(ms) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((record) => { record.path.includes('landing')})) {
    next();
  }

  while (!authStore.isKeycloakInit) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(100);
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('requiresAuth')
    if (!authStore.isAuth) {
      console.log('!authStore.isAuth')
      authStore.login(true)
    } else {
      next();
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (authStore.isAuth && !from.name) {
      next({ path: "/dashboard" });
    } else {
      next();
    }
  }

  if (!to.matched.some((record) => record.meta.hideForAuth) && !to.matched.some((record) => record.meta.requiresAuth)) {
    next()
  }
});

export default router;
