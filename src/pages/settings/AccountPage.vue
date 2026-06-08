<script setup lang="ts">
import { ref } from 'vue'
import SettingsLayout from '@/components/SettingsLayout.vue'
import TotpModal from '@/components/TotpModal.vue'
import { useToastsStore } from '@/stores/toasts.ts'

const toasts = useToastsStore()

// Email / password / delete are intentionally NOT wired: the auth backend exposes
// no endpoint for them. The controls are kept visible but disabled with a notice.
const email = ref('')

const twoFactorEnabled = ref(false)
const totpModalOpen = ref(false)

function onToggle2fa(e: Event) {
  // The checkbox is a one-way `:checked` binding, so when the bound ref value is
  // unchanged Vue won't re-patch the DOM. Reset `input.checked` explicitly to keep
  // the slider in sync with the real state.
  const input = e.target as HTMLInputElement
  if (input.checked) {
    // Don't flip the toggle on until verification succeeds; revert the DOM now.
    twoFactorEnabled.value = false
    input.checked = false
    totpModalOpen.value = true
  } else {
    // No disable endpoint exists; keep it on, re-sync the DOM, and inform the user.
    twoFactorEnabled.value = true
    input.checked = true
    toasts.push({
      type: 'info',
      message: 'La désactivation de la 2FA n’est pas disponible.',
    })
  }
}

function onTotpEnabled() {
  twoFactorEnabled.value = true
}

function onTotpClose() {
  totpModalOpen.value = false
}
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Compte</span>
      <h1>Sécurité &amp; connexion</h1>
      <p class="muted measure">Gérez votre email, mot de passe et options de sécurité.</p>
    </header>

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
            v-model="email"
            type="email"
            class="primary medium full-width"
            placeholder="vous@exemple.com"
            disabled
          />
          <p class="small muted">Fonctionnalité bientôt disponible.</p>
        </div>
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
            <label for="current">Mot de passe actuel</label>
            <input id="current" type="password" class="primary medium full-width" disabled />
          </div>
          <div class="form-group">
            <label for="new">Nouveau mot de passe</label>
            <input id="new" type="password" class="primary medium full-width" disabled />
          </div>
          <div class="form-group">
            <label for="confirm">Confirmer le mot de passe</label>
            <input id="confirm" type="password" class="primary medium full-width" disabled />
          </div>
          <button class="primary medium" style="align-self: flex-start" type="button" disabled>
            Mettre à jour le mot de passe
          </button>
          <p class="small muted">Fonctionnalité bientôt disponible.</p>
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
            <p class="medium">Activer la 2FA</p>
            <p class="small muted">
              Utilisez une application d'authentification (TOTP) pour générer un code à chaque
              connexion.
            </p>
          </div>
          <label class="toggle">
            <input :checked="twoFactorEnabled" type="checkbox" @change="onToggle2fa" />
            <span class="toggle-slider"></span>
          </label>
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
            <p class="small muted">
              Efface définitivement votre compte et toutes vos données.
              <span class="text-subtle">Fonctionnalité bientôt disponible.</span>
            </p>
          </div>
          <button class="destructive medium" type="button" disabled>Supprimer</button>
        </div>
      </div>
    </section>

    <TotpModal :open="totpModalOpen" @close="onTotpClose" @enabled="onTotpEnabled" />
  </SettingsLayout>
</template>
