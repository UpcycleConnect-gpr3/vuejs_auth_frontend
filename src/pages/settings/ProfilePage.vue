<script setup lang="ts">
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
        <h2 class="semibold">Profile</h2>
        <p>Gérez vos informations personnelles.</p>
      </hgroup>

      <!-- Avatar -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Photo de profil</h5>
        <div class="layout-flex layout-gap-medium layout-items-center">
          <div class="avatar-placeholder"></div>
          <div class="layout-flex layout-columns layout-gap-small">
            <button class="secondary small">Changer la photo</button>
            <button class="outline small">Supprimer</button>
          </div>
        </div>
      </section>

      <!-- Informations personnelles -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Informations personnelles</h5>
        <div class="form-group gap-small">
          <label for="firstname">Prénom</label>
          <input type="text" id="firstname" class="primary medium" placeholder="Jean" />
        </div>
        <div class="form-group gap-small">
          <label for="lastname">Nom</label>
          <input type="text" id="lastname" class="primary medium" placeholder="Dupont" />
        </div>
        <div class="form-group gap-small">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" class="primary medium" placeholder="@jeandupont" />
        </div>
      </section>

      <!-- Bio -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Bio</h5>
        <div class="form-group gap-small">
          <label for="bio">À propos de vous</label>
          <textarea id="bio" class="primary" rows="4" placeholder="Parlez-nous de vous..."></textarea>
        </div>
      </section>

      <div>
        <button class="primary medium">Sauvegarder</button>
      </div>
    </div>
  </main>
</template>
