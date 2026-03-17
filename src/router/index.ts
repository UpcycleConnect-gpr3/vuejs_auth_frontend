import { createRouter, createWebHistory } from 'vue-router'
import {
  ForgotPage,
  LoginPage,
  AccountPage,
  A2FCodePage,
  NotificationPage,
  ProfilePage,
  OrganizationPage,
  BillingPage,
} from '@/pages'

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
      path: '/settings/billing',
      component: BillingPage,
    },
    {
      path: '/settings/account',
      component: AccountPage,
    },
    {
      path: '/settings/teams',
      component: OrganizationPage,
    },
    {
      path: '/settings/notifications',
      component: NotificationPage,
    },
    {
      path: '/settings/profile',
      component: ProfilePage,
    },
  ],
})

export default router
