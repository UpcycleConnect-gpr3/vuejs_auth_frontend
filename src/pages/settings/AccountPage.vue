<script setup lang="ts"></script>

<template>
  <main class="layout-app">
    <nav class="sidebar">
      <hgroup>
        <h4 class="semibold">Settings</h4>
      </hgroup>
      <ul class="sidebar-nav-list">
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

    <div class="layout-flex-full layout-padding-large layout-flex layout-columns layout-gap-large">
      <hgroup>
        <h2 class="semibold">Account</h2>
        <p>Gérez les paramètres de votre compte.</p>
      </hgroup>

      <hr />

      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Adresse e-mail</h5>
        <div class="layout-flex layout-items-center layout-gap-medium">
          <p>Votre adresse e-mail est <strong>john.doe@company.com</strong></p>
          <button class="ghost small">Modifier</button>
        </div>
      </section>

      <hr />

      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Mot de passe</h5>
        <div class="form-group inline layout-gap-medium">
          <div class="form-group gap-small">
            <label for="current-password">Mot de passe actuel</label>
            <input
              type="password"
              id="current-password"
              class="primary medium"
              placeholder="***********"
            />
          </div>
          <div class="form-group gap-small">
            <label for="new-password">Nouveau mot de passe</label>
            <input
              type="password"
              id="new-password"
              class="primary medium"
              placeholder="***********"
            />
          </div>
        </div>
        <p>
          Mot de passe oublié ?
          <RouterLink to="/auth/forgot-password" class="ghost small"
            >Récupérer le compte</RouterLink
          >
        </p>
        <div>
          <button class="primary medium">Sauvegarder le mot de passe</button>
        </div>
      </section>

      <hr />

      <section class="layout-flex layout-columns layout-gap-medium">
        <h5 class="semibold">Supprimer le compte</h5>
        <p>
          Assurez-vous d'avoir sauvegardé vos données. Cette action est irréversible et supprimera
          définitivement toutes vos données.
        </p>
        <div>
          <button class="outline medium">Supprimer mon compte</button>
        </div>
      </section>
    </div>
  </main>
</template>
