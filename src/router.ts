import { createRouter, createWebHistory } from 'vue-router'

import AppRouter from '@/modules/app/router'
import DashboardRouter from '@/modules/dashboard/router'
import RecipeRouter from '@/modules/recipe/router'
import IngredientRouter from '@/modules/ingredient/router'
import FaqRouter from '@/modules/faq/router'
import SettingsRouter from '@/modules/settings/router'
import HintRouter from '@/modules/hint/router'
import SupportRouter from '@/modules/support/router'
import AuthRouter from '@/modules/auth/router'
import GroupRouter from '@/modules/group/router'
import PersonRouter from '@/modules/person/router'

const routes = [
  ...DashboardRouter,
  ...AppRouter,
  ...IngredientRouter,
  ...RecipeRouter,
  ...FaqRouter,
  ...SettingsRouter,
  ...HintRouter,
  ...SupportRouter,
  ...AuthRouter,
  ...GroupRouter,
  ...PersonRouter,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/*
// TODO: do this later
router.beforeEach((to, from, next) => {
  console.log(to);
  if(to.meta.requiresAuth && authStore.isAuth) {
    next("/login");
  } else {
    next();
  }
})
*/



export default router
