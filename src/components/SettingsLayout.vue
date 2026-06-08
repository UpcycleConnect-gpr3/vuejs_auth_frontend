<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()
const router = useRouter()

const settingsNav = [
  {
    label: 'Profil',
    to: '/settings/profile',
    icon: 'M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z',
  },
  {
    label: 'Compte',
    to: '/settings/account',
    icon: 'M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Z',
  },
]

const handleLogout = async () => {
  await authStore.logout(router)
}
</script>

<template>
  <div class="settings-shell">
    <aside class="settings-sidebar">
      <RouterLink to="/" class="logo">
        <div class="logo-dot"></div>
        <span>UpcycleConnect</span>
      </RouterLink>

      <nav class="settings-nav">
        <span class="sidebar-section-title">Paramètres</span>
        <ul class="sidebar-nav-list">
          <li v-for="item in settingsNav" :key="item.to" class="sidebar-nav-item">
            <RouterLink :to="item.to">
              <svg class="sidebar-icon" viewBox="0 0 256 256" fill="currentColor">
                <path :d="item.icon" />
              </svg>
              <span>{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="sidebar-user">
        <div class="sidebar-user-avatar">JD</div>
        <div class="sidebar-user-info">
          <span class="sidebar-user-name">Jean Dupont</span>
          <span class="sidebar-user-role">Utilisateur</span>
        </div>
        <button class="sidebar-user-action" title="Se déconnecter" @click="handleLogout">
          <svg viewBox="0 0 256 256" fill="currentColor">
            <path
              d="M120,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h64a8,8,0,0,1,0,16H48V208h64A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"
            />
          </svg>
        </button>
      </div>
    </aside>

    <main class="settings-main">
      <div class="settings-content">
        <slot />
      </div>
    </main>
  </div>
</template>
