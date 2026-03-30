<script setup lang="ts"></script>

<template>
  <main class="layout-app">
    <!-- Sidebar -->
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

    <!-- Content -->
    <div class="layout-fill layout-padding-large layout-flex layout-columns layout-gap-large">
      <hgroup>
        <h2 class="semibold">Notifications</h2>
        <p>Choisissez comment vous souhaitez être notifié.</p>
      </hgroup>

      <hr />

      <!-- Comments -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <div class="notification-row">
          <div class="notification-row-info">
            <h5 class="semibold">Commentaires</h5>
            <p>Recevez une notification lorsque quelqu'un commente votre activité.</p>
          </div>
          <div class="toggle-group">
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" checked />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              Push
            </label>
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" checked />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              Email
            </label>
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              SMS
            </label>
          </div>
        </div>
      </section>

      <hr />

      <!-- Reminders -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <div class="notification-row">
          <div class="notification-row-info">
            <h5 class="semibold">Rappels</h5>
            <p>Recevez des rappels pour ne manquer aucune échéance importante.</p>
          </div>
          <div class="toggle-group">
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              Push
            </label>
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" checked />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              Email
            </label>
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              SMS
            </label>
          </div>
        </div>
      </section>

      <hr />

      <!-- Updates -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <div class="notification-row">
          <div class="notification-row-info">
            <h5 class="semibold">Mises à jour</h5>
            <p>Soyez informé des nouvelles fonctionnalités et mises à jour.</p>
          </div>
          <div class="toggle-group">
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              Push
            </label>
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              Email
            </label>
            <label class="toggle-label">
              <span class="toggle">
                <input type="checkbox" />
                <span class="toggle-track"></span>
                <span class="toggle-thumb"></span>
              </span>
              SMS
            </label>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
