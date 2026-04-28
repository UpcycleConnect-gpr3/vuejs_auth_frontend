<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()
const router = useRouter()

const code = ref('')

const isComplete = computed(() => code.value.length === 6)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  const sanitized = target.value.replace(/\D/g, '').slice(0, 6)
  code.value = sanitized
  target.value = sanitized
}

async function handleVerify() {
  if (!isComplete.value) return
  await authStore.loginTotp({ code: code.value, hash: authStore.hash }, router)
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
        <span class="eyebrow">Vérification à deux facteurs</span>
        <h1 class="bold">Confirmez votre identité</h1>
        <p class="muted measure">
          Ouvrez votre application d'authentification et entrez le code à 6 chiffres généré.
        </p>
      </div>

      <form @submit.prevent="handleVerify" class="auth-form">
        <div class="form-group">
          <label for="otp">Code 2FA</label>
          <input
            id="otp"
            v-model="code"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            class="primary medium full-width"
            placeholder="••••••"
            @input="handleInput"
          />
          <p v-if="authStore.fieldErrors.code" class="small" style="color: var(--destructive-color)">
            {{ authStore.fieldErrors.code }}
          </p>
        </div>

        <p v-if="authStore.error && !Object.keys(authStore.fieldErrors).length" class="small" style="color: var(--destructive-color)">
          {{ authStore.error }}
        </p>

        <button
          type="submit"
          class="primary medium full-width"
          :disabled="!isComplete || authStore.isLoading"
        >
          {{ authStore.isLoading ? 'Vérification...' : 'Confirmer' }}
        </button>
      </form>

      <div class="auth-card-foot">
        <RouterLink to="/auth/login" class="ghost small">← Retour à la connexion</RouterLink>
      </div>
    </div>
  </main>
</template>
