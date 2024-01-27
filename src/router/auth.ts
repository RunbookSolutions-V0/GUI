import { type RouteRecordRaw } from 'vue-router'

import LoginView from '@/pages/auth/PageAuthLogin.vue'
import RegisterView from '@/pages/auth/PageAuthRegister.vue'
import ForgotView from '@/pages/auth/PageAuthForgot.vue'
import ResetView from '@/pages/auth/PageAuthReset.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    name: 'auth.login',
    component: LoginView
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: RegisterView
  },
  {
    path: '/auth/forgot_password',
    name: 'auth.forgot',
    component: ForgotView
  },
  {
    path: '/auth/reset_password',
    name: 'auth.reset',
    component: ResetView
  }
]

export default routes
