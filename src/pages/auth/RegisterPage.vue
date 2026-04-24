<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { AuthCredentials } from '@/types/auth.ts'
import { useAuthStore } from '@/stores/auth.ts'
import router from '@/router'

const showPassword = ref(false)
const authStore = useAuthStore()

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
  router.push({ name: 'home' })
}
</script>

<template>
  <main class="layout-flex layout-columns layout-items-center layout-gap-large">
    <hgroup>
      <h1 class="semibold center">Créer un compte</h1>
      <p class="small">Rejoignez Upcycle Connect</p>
    </hgroup>

    <form @submit.prevent="handleRegister" class="layout-small">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          class="primary medium full-width"
          id="email"
          v-model="form.email"
          type="email"
          placeholder="vous@exemple.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <div class="form-group inline">
          <input
            class="primary medium full-width"
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
          />
          <button class="primary medium" type="button" @click="showPassword = !showPassword">
            {{ showPassword ? 'Masquer' : 'Afficher' }}
          </button>
        </div>
      </div>

      <p v-if="authStore.error" class="small error">{{ authStore.error }}</p>

      <button class="primary medium" type="submit" :disabled="authStore.isLoading as boolean">
        {{ authStore.isLoading ? 'Chargement...' : "S'inscrire" }}
      </button>
      <router-link class="ghost" to="/auth/login">Déjà un compte ? Se connecter</router-link>
    </form>
  </main>
</template>
