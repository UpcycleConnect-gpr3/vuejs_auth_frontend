<script setup lang="ts">
import SettingsLayout from '@/components/SettingsLayout.vue'

const currentPlan = {
  name: 'Pro',
  price: '15€',
  period: 'mois',
  renewal: '28 mai 2026',
}

const invoices = [
  { id: 'INV-2026-04', date: '28 avril 2026', amount: '15.00€', status: 'Payée' },
  { id: 'INV-2026-03', date: '28 mars 2026', amount: '15.00€', status: 'Payée' },
  { id: 'INV-2026-02', date: '28 février 2026', amount: '15.00€', status: 'Payée' },
  { id: 'INV-2026-01', date: '28 janvier 2026', amount: '15.00€', status: 'Payée' },
]
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Facturation</span>
      <h1>Abonnement &amp; factures</h1>
      <p class="muted measure">Gérez votre plan, votre mode de paiement et consultez vos factures.</p>
    </header>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Plan actuel</h4>
        <p class="small muted">Votre abonnement en cours.</p>
      </div>
      <div class="settings-section-body">
        <div class="plan-card">
          <div class="layout-flex layout-justify-between layout-items-start">
            <div>
              <span class="badge badge--success">{{ currentPlan.name }}</span>
              <div class="plan-price-row" style="margin-top: var(--space-3);">
                <span class="plan-price">{{ currentPlan.price }}</span>
                <span class="plan-price-unit">/{{ currentPlan.period }}</span>
              </div>
              <p class="small muted" style="margin-top: var(--space-2);">
                Prochain renouvellement le {{ currentPlan.renewal }}
              </p>
            </div>
            <div class="layout-flex layout-columns layout-gap-small">
              <button class="primary small">Changer de plan</button>
              <button class="ghost small">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Moyen de paiement</h4>
        <p class="small muted">Carte utilisée pour les prélèvements automatiques.</p>
      </div>
      <div class="settings-section-body">
        <div class="setting-row">
          <div class="layout-flex layout-gap-medium layout-items-center">
            <div class="icon-box"><span class="mono" style="font-weight: 700; font-size: 10px;">VISA</span></div>
            <div>
              <p class="medium">•••• •••• •••• 4242</p>
              <p class="small muted">Expire 12/2028</p>
            </div>
          </div>
          <button class="ghost small">Modifier</button>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Historique des factures</h4>
        <p class="small muted">Téléchargez vos factures PDF.</p>
      </div>
      <div class="settings-section-body">
        <div class="table-wrapper" style="width: 100%;">
          <table>
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inv in invoices" :key="inv.id">
                <td class="mono">{{ inv.id }}</td>
                <td>{{ inv.date }}</td>
                <td class="mono">{{ inv.amount }}</td>
                <td><span class="badge badge--success">{{ inv.status }}</span></td>
                <td style="text-align: right;"><a class="ghost">Télécharger</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </SettingsLayout>
</template>
