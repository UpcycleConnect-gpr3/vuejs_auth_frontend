import { createRouter, createWebHistory } from 'vue-router'
import { ForgotPage, LoginPage } from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      component: LoginPage,
    },
    {
      path: '/auth/forgot-password',
      component: ForgotPage,
    },
  ],
})

export default router
