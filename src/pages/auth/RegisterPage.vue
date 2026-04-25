<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import type { AuthCredentials } from '@/types/auth.ts'
import { useAuthStore } from '@/stores/auth.ts'
import router from '@/router'

const showPassword = ref(false)
const authStore = useAuthStore()
const upcycleUrl = import.meta.env.VITE_UPCYCLE_URL ?? 'http://upcycle-front.localhost'

const form = reactive<AuthCredentials>({
  email: '',
  password: '',
})

async function handleRegister() {
  await authStore.register(form)
  if (!authStore.error) {
    await router.push({ name: 'login' })
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
        <span class="eyebrow">Get started</span>
        <h1 class="bold">Créer votre<br />compte gratuit</h1>
        <p class="muted measure">Rejoignez UpcycleConnect en quelques secondes.</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
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
          <label for="password">Mot de passe</label>
          <div class="input-with-action">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="primary medium full-width"
              placeholder="••••••••"
              autocomplete="new-password"
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
          {{ authStore.isLoading ? 'Création...' : "S'inscrire" }}
        </button>

        <p class="tiny muted center">
          En continuant, vous acceptez nos <a>Conditions</a> et notre <a>Politique de confidentialité</a>.
        </p>
      </form>

      <div class="auth-card-foot">
        <p class="small muted center">
          Déjà un compte ?
          <RouterLink to="/auth/login" class="ghost" style="display: inline; padding: 0;">Se connecter</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
