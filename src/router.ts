import { createRouter, createWebHistory } from 'vue-router'

import NavRouter from '@/modules/nav/router'
import DashboardRouter from '@/modules/dashboard/router'
import RecipeRouter from '@/modules/recipe/router'
import IngredientRouter from '@/modules/ingredient/router'
import FaqRouter from '@/modules/faq/router'
import SettingsRouter from '@/modules/settings/router'

const routes = [
  ...DashboardRouter,
  ...NavRouter,
  ...IngredientRouter,
  ...RecipeRouter,
  ...FaqRouter,
  ...SettingsRouter
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
