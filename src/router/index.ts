import { createRouter, createWebHistory } from 'vue-router'
import {
  ForgotPage, LoginPage, RegisterPage, A2FCodePage,
  ProfilePage, AccountPage, BillingPage, NotificationPage, OrganizationPage,
} from '@/pages'
import { useAuthStore } from '@/stores/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/settings/profile' },

    { path: '/auth/login', component: LoginPage, name: 'login' },
    { path: '/auth/register', component: RegisterPage, name: 'register' },
    { path: '/auth/forgot-password', component: ForgotPage, name: 'forgot-password' },
    { path: '/auth/a2f-code', component: A2FCodePage, name: 'a2f-code' },

    { path: '/settings/profile', component: ProfilePage, meta: { requiresAuth: true }, name: 'profile' },
    { path: '/settings/account', component: AccountPage, meta: { requiresAuth: true }, name: 'account' },
    { path: '/settings/billing', component: BillingPage, meta: { requiresAuth: true }, name: 'billing' },
    { path: '/settings/notifications', component: NotificationPage, meta: { requiresAuth: true }, name: 'notifications' },
    { path: '/settings/teams', component: OrganizationPage, meta: { requiresAuth: true }, name: 'teams' },
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
