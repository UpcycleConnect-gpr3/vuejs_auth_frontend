<script setup lang="ts"></script>

<style scoped>
.team-item {
  padding: var(--padding-small) var(--padding-medium);
  border-radius: var(--rounded-component);
  background-color: oklch(from var(--foreground-color) l c h / 0.05);
  cursor: pointer;
  font-size: var(--font-size-small);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: oklch(from var(--foreground-color) l c h / 0.1);
  }

  &.active {
    background-color: oklch(from var(--secondary-color) l c h / 0.15);
    color: var(--secondary-color);
    font-weight: 600;
  }
}

.member-item {
  padding: var(--padding-medium);
  border-radius: var(--rounded-component);
  background-color: oklch(from var(--foreground-color) l c h / 0.05);
}

.member-role {
  font-size: var(--font-size-small);
  opacity: 0.6;
}
</style>

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
    <div class="layout-flex-full layout-padding-large layout-flex layout-columns layout-gap-large">
      <hgroup>
        <h2 class="semibold">Organization</h2>
        <p>Gérez vos équipes et vos membres.</p>
      </hgroup>

      <hr />

      <!-- Teams -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <div class="layout-flex layout-items-center layout-gap-medium">
          <h5 class="semibold">Équipes</h5>
          <button class="secondary small">Créer une équipe</button>
        </div>
        <div class="layout-flex layout-columns layout-gap-small">
          <div class="team-item">Marketing</div>
          <div class="team-item active">UI/UX Design</div>
          <div class="team-item">Engineering</div>
        </div>
      </section>

      <hr />

      <!-- Members -->
      <section class="layout-flex layout-columns layout-gap-medium">
        <div class="layout-flex layout-items-center layout-gap-medium">
          <h5 class="semibold">Membres</h5>
          <button class="primary small">Inviter un membre</button>
        </div>
        <div class="layout-flex layout-columns layout-gap-small">
          <!-- Member 1 -->
          <div class="member-item layout-flex layout-columns layout-gap-medium">
            <div class="layout-flex layout-items-center layout-gap-medium">
              <span>Shakir Ali</span>
              <span class="member-role">UI/UX Design</span>
              <div class="layout-flex layout-gap-small" style="margin-left: auto">
                <button class="ghost small-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button class="outline small-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="form-group inline layout-gap-medium">
              <div class="form-group gap-small">
                <label for="member1-name">Nom</label>
                <input type="text" id="member1-name" class="primary medium" value="Shakir Ali" />
              </div>
              <div class="form-group gap-small">
                <label for="member1-email">Email</label>
                <input
                  type="email"
                  id="member1-email"
                  class="primary medium"
                  value="shakir.ali@company.com"
                />
              </div>
            </div>
            <div>
              <button class="primary medium">Sauvegarder</button>
            </div>
          </div>

          <!-- Member 2 -->
          <div class="member-item layout-flex layout-items-center layout-gap-medium">
            <span>Ebbie James</span>
            <span class="member-role">Marketing</span>
            <div class="layout-flex layout-gap-small" style="margin-left: auto">
              <button class="ghost small-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button class="outline small-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Member 3 -->
          <div class="member-item layout-flex layout-items-center layout-gap-medium">
            <span>Mica Calister</span>
            <span class="member-role">Engineering</span>
            <div class="layout-flex layout-gap-small" style="margin-left: auto">
              <button class="ghost small-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button class="outline small-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
