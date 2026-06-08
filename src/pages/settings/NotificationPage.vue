<script setup lang="ts">
import SettingsLayout from '@/components/SettingsLayout.vue'

// No notifications backend exists — the page is masked.
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Notifications</span>
      <h1>Préférences</h1>
      <p class="muted measure">
        Choisissez quelles notifications vous voulez recevoir et par quel canal.
      </p>
    </header>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Notifications</h4>
        <p class="small muted">Cette section sera disponible prochainement.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Fonctionnalité bientôt disponible</p>
            <p class="small muted">
              La gestion des préférences de notification n'est pas encore connectée à un service.
            </p>
          </div>
        </div>
      </div>
    </section>
  </SettingsLayout>
</template>
