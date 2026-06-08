<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppModal from '@/components/AppModal.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useToastsStore } from '@/stores/toasts.ts'
import type { ApiError } from '@/types/api.ts'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  // emitted only once 2FA has been successfully enabled
  (e: 'enabled'): void
}>()

const authStore = useAuthStore()
const toasts = useToastsStore()

const totpUrl = ref('')
const code = ref('')
const loadingSetup = ref(false)
const submitting = ref(false)
const setupError = ref('')
const fieldError = ref('')

// Extract the shared secret from the otpauth:// URI for manual entry.
const secret = computed(() => {
  const match = totpUrl.value.match(/[?&]secret=([^&]+)/i)
  return match && match[1] ? decodeURIComponent(match[1]) : ''
})

const isComplete = computed(() => code.value.length === 6)

function reset() {
  totpUrl.value = ''
  code.value = ''
  setupError.value = ''
  fieldError.value = ''
  submitting.value = false
  loadingSetup.value = false
}

async function loadSetup() {
  loadingSetup.value = true
  setupError.value = ''
  try {
    totpUrl.value = await authStore.setupTotp()
  } catch (err: unknown) {
    const apiError = (err as { response?: { data?: ApiError } }).response?.data
    setupError.value =
      apiError?.message || (err as Error).message || 'Impossible de récupérer la configuration 2FA.'
  } finally {
    loadingSetup.value = false
  }
}

function onCodeInput(e: Event) {
  const target = e.target as HTMLInputElement
  const sanitized = target.value.replace(/\D/g, '').slice(0, 6)
  code.value = sanitized
  target.value = sanitized
}

async function copySecret() {
  const text = secret.value || totpUrl.value
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    toasts.push({ type: 'info', message: 'Clé copiée dans le presse-papier.' })
  } catch {
    toasts.push({ type: 'error', message: 'Impossible de copier la clé.' })
  }
}

async function submit() {
  if (!isComplete.value || submitting.value) return
  submitting.value = true
  fieldError.value = ''
  try {
    await authStore.verifyTotp(code.value)
    toasts.push({ type: 'success', message: 'Authentification à 2 facteurs activée.' })
    emit('enabled')
    emit('close')
  } catch (err: unknown) {
    const apiError = (err as { response?: { data?: ApiError } }).response?.data
    fieldError.value =
      apiError?.errors?.find((fe) => fe.field === 'code')?.message ||
      apiError?.message ||
      (err as Error).message ||
      'Code TOTP invalide.'
    toasts.push({ type: 'error', message: fieldError.value })
  } finally {
    submitting.value = false
  }
}

// Fetch the otpauth URI each time the modal opens; clear state when it closes.
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      reset()
      void loadSetup()
    } else {
      reset()
    }
  },
)
</script>

<template>
  <AppModal :open="open" title="Activer la 2FA" @close="emit('close')">
    <div v-if="loadingSetup" class="totp-loading">
      <LoadingSpinner :size="24" />
      <span class="small muted">Préparation de la configuration…</span>
    </div>

    <div v-else-if="setupError" class="totp-setup-error">
      <p class="small" style="color: var(--destructive-color)">{{ setupError }}</p>
      <button type="button" class="outline small" @click="loadSetup">Réessayer</button>
    </div>

    <template v-else>
      <ol class="totp-steps small muted">
        <li>
          Ouvrez votre application d'authentification (Google Authenticator, Authy, 1Password…).
        </li>
        <li>Ajoutez un compte en saisissant la clé ci-dessous (ou en collant l'URI complète).</li>
        <li>Saisissez le code à 6 chiffres généré pour confirmer.</li>
      </ol>

      <div class="form-group">
        <label>Clé de configuration</label>
        <div class="totp-secret">
          <code class="mono">{{ secret || totpUrl }}</code>
          <button type="button" class="ghost small" @click="copySecret">Copier</button>
        </div>
        <p class="tiny muted">
          URI complète :
          <code class="mono totp-uri">{{ totpUrl }}</code>
        </p>
      </div>

      <form class="form-group" @submit.prevent="submit">
        <label for="totp-code">Code de vérification</label>
        <input
          id="totp-code"
          v-model="code"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="6"
          class="primary medium full-width"
          placeholder="••••••"
          @input="onCodeInput"
        />
        <p v-if="fieldError" class="small" style="color: var(--destructive-color)">
          {{ fieldError }}
        </p>
      </form>
    </template>

    <template #footer>
      <button type="button" class="ghost medium" @click="emit('close')">Annuler</button>
      <button
        type="button"
        class="primary medium"
        :disabled="loadingSetup || !!setupError || !isComplete || submitting"
        @click="submit"
      >
        <LoadingSpinner v-if="submitting" :size="16" />
        <span v-else>Activer</span>
      </button>
    </template>
  </AppModal>
</template>

<style scoped>
.totp-loading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) 0;
}

.totp-setup-error {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: flex-start;
}

.totp-steps {
  list-style: decimal;
  padding-left: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  line-height: 1.5;
}

.totp-secret {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--green-900);
  border: 1px solid var(--green-700);
}

.totp-secret code {
  flex: 1;
  word-break: break-all;
  font-size: var(--font-size-small);
  color: var(--lime-500);
}

.totp-uri {
  word-break: break-all;
  color: var(--text-tertiary);
}
</style>
