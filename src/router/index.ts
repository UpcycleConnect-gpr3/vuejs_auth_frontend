import { createRouter, createWebHistory, useRoute } from 'vue-router'
import {
  ForgotPage,
  LoginPage,
  AccountPage,
  A2FCodePage,
  NotificationPage,
  ProfilePage,
  OrganizationPage,
  BillingPage,
  HomePage,
} from '@/pages'
import { useAuthStore } from '@/stores/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: { requiresAuth: true },
      name: 'home',
    },
    {
      path: '/auth/login',
      component: LoginPage,
      name: 'login',
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

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router
