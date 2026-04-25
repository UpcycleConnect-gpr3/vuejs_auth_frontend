<script setup lang="ts">
import { ref, reactive } from 'vue'
import SettingsLayout from '@/components/SettingsLayout.vue'

const form = reactive({
  email: 'jean.dupont@example.com',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const twoFactorEnabled = ref(false)
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
          <input id="email" v-model="form.email" type="email" class="primary medium full-width" />
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
            <input id="current" v-model="form.currentPassword" type="password" class="primary medium full-width" />
          </div>
          <div class="form-group">
            <label for="new">Nouveau mot de passe</label>
            <input id="new" v-model="form.newPassword" type="password" class="primary medium full-width" />
          </div>
          <div class="form-group">
            <label for="confirm">Confirmer le mot de passe</label>
            <input id="confirm" v-model="form.confirmPassword" type="password" class="primary medium full-width" />
          </div>
          <button class="primary medium" style="align-self: flex-start;">Mettre à jour le mot de passe</button>
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
            <p class="small muted">Un code sera envoyé par email à chaque connexion.</p>
          </div>
          <label class="toggle">
            <input v-model="twoFactorEnabled" type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section danger-zone">
      <div class="settings-section-head">
        <h4 style="color: var(--destructive-color);">Zone de danger</h4>
        <p class="small muted">Actions irréversibles sur votre compte.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Supprimer le compte</p>
            <p class="small muted">Efface définitivement votre compte et toutes vos données.</p>
          </div>
          <button class="destructive medium">Supprimer</button>
        </div>
      </div>
    </section>
  </SettingsLayout>
</template>
