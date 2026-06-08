<script setup lang="ts">
import SettingsLayout from '@/components/SettingsLayout.vue'

// No billing backend exists — the page is masked.
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Facturation</span>
      <h1>Abonnement &amp; factures</h1>
      <p class="muted measure">
        Gérez votre plan, votre mode de paiement et consultez vos factures.
      </p>
    </header>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Facturation</h4>
        <p class="small muted">Cette section sera disponible prochainement.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div>
            <p class="medium">Fonctionnalité bientôt disponible</p>
            <p class="small muted">
              La gestion de la facturation n'est pas encore connectée à un service.
            </p>
          </div>
        </div>
      </div>
    </section>
  </SettingsLayout>
</template>
