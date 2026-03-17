import { createRouter, createWebHistory } from 'vue-router'
import { ForgotPage, LoginPage, SettingPage, AccountPage } from '@/pages'
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
      path: '/auth/a2f-code',
      component: A2FCodePage,
    },
    {
      path: '/setting',
      component: SettingPage,
    },
    {
      path: '/setting/account',
      component: AccountPage,
    },
  ],
})

export default router
