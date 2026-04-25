<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const code = ref('')
const email = ref('vous@exemple.com')
const isVerifying = ref(false)
const error = ref<string | null>(null)

const isComplete = computed(() => code.value.length === 6)

const resendCountdown = ref(45)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    if (resendCountdown.value > 0) resendCountdown.value--
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  const sanitized = target.value.replace(/\D/g, '').slice(0, 6)
  code.value = sanitized
  target.value = sanitized
}

async function handleVerify() {
  if (!isComplete.value) return
  isVerifying.value = true
  error.value = null
  console.log('Verify:', code.value)
  setTimeout(() => {
    isVerifying.value = false
  }, 800)
}

function handleResend() {
  if (resendCountdown.value > 0) return
  resendCountdown.value = 45
  console.log('Resend code')
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
        <span class="eyebrow">Vérification à 2 facteurs</span>
        <h1 class="bold">Vérifiez<br />votre compte</h1>
        <p>
          Nous avons envoyé un code à 6 chiffres à
          <strong style="color: var(--lime-500);">{{ email }}</strong>.
          Entrez-le ci-dessous pour continuer.
        </p>
      </div>

      <form class="auth-form" @submit.prevent="handleVerify">
        <div class="form-group">
          <label for="otp" class="uppercase">Code de vérification</label>
          <input
            id="otp"
            :value="code"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            class="primary large full-width otp-single"
            placeholder="••••••"
            @input="handleInput"
          />
        </div>

        <p v-if="error" class="small" style="color: var(--destructive-color);">{{ error }}</p>

        <button
          type="submit"
          class="primary medium full-width"
          :disabled="!isComplete || isVerifying"
        >
          {{ isVerifying ? 'Vérification…' : 'Vérifier le code' }}
        </button>

        <div class="resend-row">
          <span class="small text-subtle">Vous n'avez pas reçu de code ?</span>
          <button
            type="button"
            class="ghost small resend-btn"
            :disabled="resendCountdown > 0"
            @click="handleResend"
          >
            <span v-if="resendCountdown > 0">Renvoyer dans {{ resendCountdown }}s</span>
            <span v-else>Renvoyer le code</span>
          </button>
        </div>
      </form>

      <div class="auth-card-foot">
        <p class="small muted center">
          <RouterLink to="/auth/login" style="color: var(--lime-500);">← Retour à la connexion</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
