<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { AuthCredentials } from '@/types/auth.ts'
import { useAuthStore } from '@/stores/auth.ts'

const showPassword = ref(false)
const authStore = useAuthStore()

const form = reactive<AuthCredentials>({
  email: '',
  password: '',
})

async function handleLogin() {
  await authStore.login(form)
}
</script>

<template>
  <main class="layout-flex layout-columns layout-items-center layout-gap-large">
    <hgroup>
      <h1 class="semibold center">Connexion</h1>
      <p class="small">Connecter vous à votre compte Upcycle Connect</p>
    </hgroup>

    <form @submit.prevent="handleLogin" class="layout-small">
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

      <div class="form-group">
        <label>
          <input type="checkbox" />
          Se souvenir de moi
        </label>
      </div>

      <button class="primary medium" type="submit">Se connecter</button>
      <router-link class="ghost" to="forgot-password">Mot de passe oublié ?</router-link>
    </form>
  </main>
</template>
