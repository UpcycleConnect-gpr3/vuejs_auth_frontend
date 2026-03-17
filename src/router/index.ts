import { createRouter, createWebHistory } from 'vue-router'
import { ForgotPage, LoginPage } from '@/pages'
import A2FCodePage from '@/pages/auth/A2FCodePage.vue'

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
    {
      path: '/auth/A2F-code',
      component: A2FCodePage,
    },
  ],
})

export default router
