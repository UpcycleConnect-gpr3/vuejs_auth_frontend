import { createRouter, createWebHistory } from 'vue-router'
import { LoginPage } from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      component: LoginPage,
    },
  ],
})

export default router
