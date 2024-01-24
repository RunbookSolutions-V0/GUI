import { type RouteRecordRaw } from 'vue-router'

import LoginView from '@/pages/auth/PageAuthLogin.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    name: 'auth.login',
    component: LoginView
  }
]

export default routes
