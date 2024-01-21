import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores';
import DashboardView from '../views/DashboardView.vue'
import LoginView from "../views/auth/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    /^\/auth\//,
  ];
  const authRequired = !publicPages.some(pattern => pattern.test(to.path));
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      return {
          path: '/auth/login',
          query: { returnUrl: to.href }
      };
  }
});

export default router
