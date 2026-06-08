<script setup lang="ts">
import SettingsLayout from '@/components/SettingsLayout.vue'

// No organization / teams backend exists — the page is masked.
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Organisation</span>
      <h1>Équipe &amp; membres</h1>
      <p class="muted measure">Gérez votre organisation et les membres de votre équipe.</p>
    </header>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Organisation</h4>
        <p class="small muted">Cette section sera disponible prochainement.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Fonctionnalité bientôt disponible</p>
            <p class="small muted">
              La gestion de l'organisation et des membres n'est pas encore connectée à un service.
            </p>
          </div>
        </div>
      </div>
    </section>
  </SettingsLayout>
</template>
