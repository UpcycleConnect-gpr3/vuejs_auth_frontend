<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import type { AuthCredentials } from '@/types/auth.ts'
import { useAuthStore } from '@/stores/auth.ts'

const showPassword = ref(false)
const authStore = useAuthStore()

const upcycleUrl = import.meta.env.VITE_UPCYCLE_URL ?? 'http://upcycle-front.localhost'

const form = reactive<AuthCredentials>({
  email: '',
  password: '',
})

async function handleLogin() {
  await authStore.login(form)
  if (authStore.isAuthenticated) {
    window.location.href = upcycleUrl
  }
}

if (authStore.isAuthenticated) {
  window.location.href = upcycleUrl
}
</script>

<template>
  <main class="auth-shell">
    <div class="auth-card">
      <div class="auth-card-head">
        <RouterLink to="/" class="logo">
          <div class="logo-dot"></div>
          <span>UpcycleConnect</span>
        </RouterLink>
        <span class="eyebrow">Welcome back</span>
        <h1 class="bold">Connectez-vous à<br />votre compte</h1>
        <p class="muted measure">Bon retour parmi nous. Renseignez vos identifiants ci-dessous.</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="primary medium full-width"
            placeholder="vous@exemple.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-group">
          <div class="layout-flex layout-justify-between layout-items-center">
            <label for="password">Mot de passe</label>
            <RouterLink to="/auth/forgot-password" class="ghost">Mot de passe oublié ?</RouterLink>
          </div>
          <div class="input-with-action">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="primary medium full-width"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
            <button type="button" class="ghost small" @click="showPassword = !showPassword">
              {{ showPassword ? 'Masquer' : 'Afficher' }}
            </button>
          </div>
        </div>

        <p v-if="authStore.error" class="small" style="color: var(--destructive-color);">
          {{ authStore.error }}
        </p>

        <button type="submit" class="primary medium full-width" :disabled="authStore.isLoading as boolean">
          {{ authStore.isLoading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <div class="auth-card-foot">
        <p class="small muted center">
          Pas encore de compte ?
          <RouterLink to="/auth/register" class="ghost" style="display: inline; padding: 0;">Créer un compte</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
