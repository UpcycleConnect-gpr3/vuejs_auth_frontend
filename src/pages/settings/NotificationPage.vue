<script setup lang="ts">
import { reactive } from 'vue'
import SettingsLayout from '@/components/SettingsLayout.vue'

const notifications = reactive({
  emailMarketing: false,
  emailProduct: true,
  emailSecurity: true,
  pushNew: true,
  pushMentions: true,
  pushMessages: false,
})
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Notifications</span>
      <h1>Préférences</h1>
      <p class="muted measure">Choisissez quelles notifications vous voulez recevoir et par quel canal.</p>
    </header>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Email</h4>
        <p class="small muted">Notifications envoyées à votre adresse email.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Nouveautés &amp; produits</p>
            <p class="small muted">Annonces de fonctionnalités et conseils.</p>
          </div>
          <label class="toggle">
            <input v-model="notifications.emailProduct" type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div>
            <p class="medium">Marketing</p>
            <p class="small muted">Offres, promotions et événements partenaires.</p>
          </div>
          <label class="toggle">
            <input v-model="notifications.emailMarketing" type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div>
            <p class="medium">Sécurité</p>
            <p class="small muted">Connexions suspectes et changements de compte. <span class="text-subtle">(obligatoire)</span></p>
          </div>
          <label class="toggle">
            <input v-model="notifications.emailSecurity" type="checkbox" disabled />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Push</h4>
        <p class="small muted">Notifications dans le navigateur et l'app mobile.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Nouveaux messages</p>
            <p class="small muted">Quand quelqu'un vous écrit directement.</p>
          </div>
          <label class="toggle">
            <input v-model="notifications.pushMessages" type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div>
            <p class="medium">Mentions</p>
            <p class="small muted">Quand on vous mentionne dans un talk.</p>
          </div>
          <label class="toggle">
            <input v-model="notifications.pushMentions" type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div>
            <p class="medium">Nouveautés de la plateforme</p>
            <p class="small muted">Nouvelles fonctionnalités et mises à jour.</p>
          </div>
          <label class="toggle">
            <input v-model="notifications.pushNew" type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </section>

    <footer class="settings-footer">
      <button class="ghost medium">Annuler</button>
      <button class="primary medium">Sauvegarder</button>
    </footer>
  </SettingsLayout>
</template>
