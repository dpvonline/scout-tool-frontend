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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
