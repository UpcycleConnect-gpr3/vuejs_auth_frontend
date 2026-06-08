<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { AuthCredentials } from '@/types/auth.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { useToastsStore } from '@/stores/toasts.ts'

const showPassword = ref(false)
const authStore = useAuthStore()
const toasts = useToastsStore()
const router = useRouter()
const upcycleUrl = import.meta.env.VITE_UPCYCLE_URL

const form = reactive<AuthCredentials>({
  email: '',
  password: '',
})

// Client-side password-strength heuristic (length / upper / digit / symbol).
const passwordScore = computed(() => {
  const pwd = form.password
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
})

const STRENGTH = [
  { label: 'Très faible', variant: 'weak' },
  { label: 'Faible', variant: 'weak' },
  { label: 'Moyen', variant: 'medium' },
  { label: 'Bon', variant: 'good' },
  { label: 'Fort', variant: 'strong' },
] as const

const passwordStrength = computed(() => STRENGTH[passwordScore.value] ?? STRENGTH[0])

async function handleRegister() {
  await authStore.register(form, router)
  if (!authStore.error) {
    toasts.push({ type: 'success', message: 'Compte créé. Vous pouvez vous connecter.' })
    await router.push({ name: 'login' })
  } else {
    toasts.push({ type: 'error', message: authStore.error ?? 'Une erreur est survenue' })
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
          <p
            v-if="authStore.fieldErrors.email"
            class="small"
            style="color: var(--destructive-color)"
          >
            {{ authStore.fieldErrors.email }}
          </p>
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
          <div v-if="form.password" class="password-strength">
            <div class="password-strength-bars">
              <span
                v-for="i in 4"
                :key="i"
                class="password-strength-bar"
                :class="[{ filled: i <= passwordScore }, `is-${passwordStrength.variant}`]"
              ></span>
            </div>
            <span class="tiny muted">{{ passwordStrength.label }}</span>
          </div>
          <p
            v-if="authStore.fieldErrors.password"
            class="small"
            style="color: var(--destructive-color)"
          >
            {{ authStore.fieldErrors.password }}
          </p>
        </div>

        <p
          v-if="authStore.error && !Object.keys(authStore.fieldErrors).length"
          class="small"
          style="color: var(--destructive-color)"
        >
          {{ authStore.error }}
        </p>

        <button
          type="submit"
          class="primary medium full-width"
          :disabled="authStore.isLoading as boolean"
        >
          {{ authStore.isLoading ? 'Création...' : "S'inscrire" }}
        </button>

        <p class="tiny muted center">
          En continuant, vous acceptez nos
          <a href="#/cgu" class="inline">Conditions</a> et notre
          <a href="#/confidentialite" class="inline">Politique de confidentialité</a>.
        </p>
      </form>

      <div class="auth-card-foot">
        <p class="small muted center">
          Déjà un compte ?
          <RouterLink to="/auth/login" class="ghost" style="display: inline; padding: 0"
            >Se connecter</RouterLink
          >
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.password-strength {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.password-strength-bars {
  display: flex;
  flex: 1;
  gap: var(--space-1);
}

.password-strength-bar {
  flex: 1;
  height: 4px;
  background-color: oklch(from var(--foreground-color) l c h / 0.15);
  transition: background-color var(--transition-base);
}

.password-strength-bar.filled.is-weak {
  background-color: var(--destructive-color);
}

.password-strength-bar.filled.is-medium {
  background-color: var(--accent-color);
}

.password-strength-bar.filled.is-good {
  background-color: var(--lime-400);
}

.password-strength-bar.filled.is-strong {
  background-color: var(--lime-500);
}
</style>
