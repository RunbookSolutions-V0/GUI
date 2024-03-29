import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { useAuthStore } from '@/stores'
import DashboardView from '../pages/PageDashboard.vue'

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  }
]

import authRoutes from './auth'
import moduleRoutes from '@/modules/routes'

routes = routes.concat(authRoutes).concat(moduleRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [/^\/auth\//]
  const authRequired = !publicPages.some((pattern) => pattern.test(to.path))
  const authStore = useAuthStore()

  if (authRequired && !authStore.user) {
    return {
      path: '/auth/login',
      query: { returnUrl: to.path }
    }
  }
})

export default router
