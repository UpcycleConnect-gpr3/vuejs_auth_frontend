import { createRouter, createWebHistory } from 'vue-router'
import {
  ForgotPage,
  LoginPage,
  AccountPage,
  A2FCodePage,
  TeamPage,
  NotificationPage,
  ProfilePage,
} from '@/pages'
import BillingPage from '@/pages/Setting/BillingPage.vue'

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
      path: '/setting/billing',
      component: BillingPage,
    },
    {
      path: '/setting/account',
      component: AccountPage,
    },
    {
      path: '/setting/teams',
      component: TeamPage,
    },
    {
      path: '/setting/notifications',
      component: NotificationPage,
    },
    {
      path: '/setting/profile',
      component: ProfilePage,
    },
  ],
})

export default router
