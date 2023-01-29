import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/modules/auth/store/index.ts";

import AppRouter from "@/modules/app/router";
import DashboardRouter from "@/modules/dashboard/router";
import SettingsRouter from "@/modules/settings/router";
import AuthRouter from "@/modules/auth/router";
import GroupRouter from "@/modules/group/router";
import PersonRouter from "@/modules/person/router";
import LandingMain from "@/modules/landing/router";
import TaskRouter from "@/modules/task/router";

const routes = [
  ...DashboardRouter,
  ...AppRouter,
  ...SettingsRouter,
  ...AuthRouter,
  ...GroupRouter,
  ...PersonRouter,
  ...LandingMain,
  ...TaskRouter,
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

  while (!authStore.isKeycloakInit) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(100);
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuth) {
      console.log('1')
      next({ path: "/login" });
    } else {
      console.log('2')
      next();
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (authStore.isAuth) {
      console.log('3')
      next({ path: "/dashboard" });
    } else {
      console.log('4')
      next();
    }
  }

  if (!to.matched.some((record) => record.meta.hideForAuth) && !to.matched.some((record) => record.meta.requiresAuth)) {
    next()
  }
});

export default router;
