<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="layout-app">
    <!-- Sidebar -->
    <nav class="sidebar">
      <hgroup>
        <h4 class="semibold">Settings</h4>
      </hgroup>
      <ul class="sidebar-nav">
        <li class="sidebar-nav-item">
          <RouterLink to="/settings/profile">Profile</RouterLink>
        </li>
        <li class="sidebar-nav-item">
          <RouterLink to="/settings/account">Account</RouterLink>
        </li>
        <li class="sidebar-nav-item">
          <RouterLink to="/settings/teams">Organization</RouterLink>
        </li>
        <li class="sidebar-nav-item">
          <RouterLink to="/settings/billing">Billing</RouterLink>
        </li>
        <li class="sidebar-nav-item">
          <RouterLink to="/settings/notifications">Notifications</RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Content -->
    <div class="layout-fill layout-padding-large layout-flex layout-columns layout-gap-large">
      <hgroup>
        <h2 class="semibold">Billing</h2>
        <p>Gérez votre abonnement et vos informations de paiement.</p>
      </hgroup>

      <hr />

      <!-- Plan actuel -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Plan actuel</h5>
        <div class="layout-flex layout-items-center layout-gap-medium">
          <p>Vous êtes sur le plan <strong>Free</strong>.</p>
          <button class="secondary small">Passer à Pro</button>
        </div>
      </section>

      <hr />

      <!-- Moyen de paiement -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Moyen de paiement</h5>
        <p>Aucun moyen de paiement enregistré.</p>
        <div>
          <button class="primary medium">Ajouter une carte</button>
        </div>
      </section>

      <hr />

      <!-- Historique de facturation -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Historique de facturation</h5>
        <p>Aucune facture disponible pour le moment.</p>
      </section>
    </div>
  </main>
</template>
