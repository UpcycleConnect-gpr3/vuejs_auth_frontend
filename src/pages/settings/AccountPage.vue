<script setup lang="ts">
import { ref, reactive, computed, onMounted, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import SettingsLayout from '@/components/SettingsLayout.vue'
import { useUserStore } from '@/stores/user.ts'
import { useTotpStore } from '@/stores/totp.ts'
import { useAuthStore } from '@/stores/auth.ts'

const userStore = useUserStore()
const totpStore = useTotpStore()
const authStore = useAuthStore()
const router = useRouter()

const emailForm = reactive({
  email: '',
})

const passwordForm = reactive({
  newPassword: '',
  confirmPassword: '',
})

const totpCode = ref('')
const showTotpSetup = ref(false)

const isLoading = computed(() => userStore.isLoading || totpStore.isLoading)
const error = computed(() => userStore.error || totpStore.error)
const fieldErrors = computed(() => ({ ...userStore.fieldErrors, ...totpStore.fieldErrors }))
const isTotpEnabled = computed(() => userStore.user?.totp_enabled || false)

const qrcodeUrl = shallowRef('text-to-encode')
const qrcode = useQRCode(qrcodeUrl)

const isPasswordValid = computed(() => {
  return (
    passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.newPassword.length > 0
  )
})

const loadUserData = async () => {
  await userStore.fetchUser()
  if (userStore.user) {
    emailForm.email = userStore.user.email || ''
  }
}

const handleSaveEmail = async () => {
  await userStore.updateUser({ email: emailForm.email })
}

const handleSavePassword = async () => {
  if (!isPasswordValid.value) return
  await userStore.updatePassword(passwordForm.newPassword)
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

const handleSetupTotp = async () => {
  if (isTotpEnabled.value) return
  await totpStore.fetchTotpUrl()
  if (totpStore.totpUrl) {
    qrcodeUrl.value = totpStore.totpUrl
  }
  showTotpSetup.value = true
}

const handleEnableTotp = async () => {
  if (totpCode.value.length !== 6) return
  const success = await totpStore.enableTotp(totpCode.value)
  if (success) {
    showTotpSetup.value = false
    totpCode.value = ''
    totpStore.clearTotpUrl()
    await userStore.fetchUser()
  }
}

const handleCancelTotpSetup = () => {
  showTotpSetup.value = false
  totpCode.value = ''
  totpStore.clearTotpUrl()
}

const handleDeleteAccount = async () => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    return
  }
  const success = await userStore.deleteUser()
  if (success) {
    await userStore.clearUser()
    await authStore.logout(router)
  }
}

onMounted(() => {
  loadUserData()
})
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Compte</span>
      <h1>Sécurité &amp; connexion</h1>
      <p class="muted measure">Gérez votre email, mot de passe et options de sécurité.</p>
    </header>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="loadUserData" class="ghost small">Réessayer</button>
    </div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Email</h4>
        <p class="small muted">Email utilisé pour se connecter et recevoir les notifications.</p>
      </div>
      <div class="settings-section-body">
        <div class="form-group">
          <label for="email">Adresse email</label>
          <input
            id="email"
            v-model="emailForm.email"
            type="email"
            class="primary medium full-width"
          />
          <div v-if="fieldErrors.email" class="error-message small">{{ fieldErrors.email }}</div>
        </div>
        <button class="primary medium" :disabled="isLoading" @click="handleSaveEmail">
          {{ isLoading ? 'Sauvegarde...' : "Sauvegarder l'email" }}
        </button>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Mot de passe</h4>
        <p class="small muted">Au moins 8 caractères, avec un chiffre et un caractère spécial.</p>
      </div>
      <div class="settings-section-body">
        <form class="layout-flex layout-columns layout-gap-medium">
          <div class="form-group">
            <label for="new">Nouveau mot de passe</label>
            <input
              id="new"
              v-model="passwordForm.newPassword"
              type="password"
              class="primary medium full-width"
            />
            <div v-if="fieldErrors.password" class="error-message small">
              {{ fieldErrors.password }}
            </div>
          </div>
          <div class="form-group">
            <label for="confirm">Confirmer le mot de passe</label>
            <input
              id="confirm"
              v-model="passwordForm.confirmPassword"
              type="password"
              class="primary medium full-width"
            />
            <div
              v-if="passwordForm.confirmPassword && !isPasswordValid"
              class="error-message small"
            >
              Les mots de passe ne correspondent pas.
            </div>
          </div>
          <button
            class="primary medium"
            style="align-self: flex-start"
            :disabled="!isPasswordValid || isLoading"
            @click.prevent="handleSavePassword"
          >
            {{ isLoading ? 'Sauvegarde...' : 'Mettre à jour le mot de passe' }}
          </button>
        </form>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Authentification à 2 facteurs</h4>
        <p class="small muted">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Authentification à 2 facteurs</p>
            <p class="small muted">
              {{
                isTotpEnabled
                  ? 'La 2FA est activée sur votre compte.'
                  : "Un code sera généré via une application d'authentification."
              }}
            </p>
          </div>
          <button class="primary medium" :disabled="isLoading" @click="handleSetupTotp">
            {{ isTotpEnabled ? 'Désactiver' : 'Activer' }}
          </button>
        </div>

        <div v-if="showTotpSetup" class="totp-setup">
          <div class="totp-qrcode">
            <p class="medium">Scannez ce QR code avec votre application d'authentification :</p>
            <img :src="qrcode" alt="QR Code 2FA" class="qrcode-image" v-if="qrcode" />
            <div class="form-group">
              <label for="totp-code">Code à 6 chiffres</label>
              <input
                id="totp-code"
                v-model="totpCode"
                type="text"
                inputmode="numeric"
                maxlength="6"
                class="primary medium full-width"
                placeholder="••••••"
                @input="totpCode = totpCode.replace(/\D/g, '').slice(0, 6)"
              />
              <div v-if="fieldErrors.code" class="error-message small">{{ fieldErrors.code }}</div>
            </div>
            <div class="layout-flex layout-gap-medium">
              <button class="ghost medium" @click="handleCancelTotpSetup" :disabled="isLoading">
                Annuler
              </button>
              <button
                class="primary medium"
                @click="handleEnableTotp"
                :disabled="totpCode.length !== 6 || isLoading"
              >
                {{ isLoading ? 'Activation...' : 'Activer la 2FA' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section danger-zone">
      <div class="settings-section-head">
        <h4 style="color: var(--destructive-color)">Zone de danger</h4>
        <p class="small muted">Actions irréversibles sur votre compte.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Supprimer le compte</p>
            <p class="small muted">Efface définitivement votre compte et toutes vos données.</p>
          </div>
          <button class="destructive medium" :disabled="isLoading" @click="handleDeleteAccount">
            {{ isLoading ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </section>
  </SettingsLayout>
</template>
