<script setup lang="ts">
import { ref, reactive } from 'vue'
import SettingsLayout from '@/components/SettingsLayout.vue'

const organization = reactive({
  name: 'UpcycleConnect Studio',
  website: 'https://upcycleconnect.com',
  size: '10-50',
})

const members = ref([
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Owner', initials: 'JD' },
  { id: 2, name: 'Marie Laurent', email: 'marie@example.com', role: 'Admin', initials: 'ML' },
  { id: 3, name: 'Thomas Martin', email: 'thomas@example.com', role: 'Member', initials: 'TM' },
  { id: 4, name: 'Julie Bernard', email: 'julie@example.com', role: 'Member', initials: 'JB' },
])

const inviteEmail = ref('')

function removeMember(id: number) {
  members.value = members.value.filter((m) => m.id !== id)
}

function inviteMember() {
  if (!inviteEmail.value) return
  console.log('Invite:', inviteEmail.value)
  inviteEmail.value = ''
}
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Organisation</span>
      <h1>Équipe &amp; organisation</h1>
      <p class="muted measure">Gérez votre organisation et les membres qui en font partie.</p>
    </header>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Informations</h4>
        <p class="small muted">Détails publics de l'organisation.</p>
      </div>
      <div class="settings-section-body">
        <form class="layout-flex layout-columns layout-gap-medium">
          <div class="form-group">
            <label for="org-name">Nom</label>
            <input id="org-name" v-model="organization.name" type="text" class="primary medium full-width" />
          </div>
          <div class="form-group">
            <label for="org-site">Site web</label>
            <input id="org-site" v-model="organization.website" type="url" class="primary medium full-width" />
          </div>
          <div class="form-group">
            <label for="org-size">Taille</label>
            <select id="org-size" v-model="organization.size" class="primary medium full-width">
              <option>1-10</option>
              <option>10-50</option>
              <option>50-200</option>
              <option>200+</option>
            </select>
          </div>
        </form>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Inviter un membre</h4>
        <p class="small muted">Envoyez une invitation par email.</p>
      </div>
      <div class="settings-section-body">
        <form @submit.prevent="inviteMember" class="layout-flex layout-gap-medium">
          <input
            v-model="inviteEmail"
            type="email"
            class="primary medium"
            placeholder="email@example.com"
            style="flex: 1;"
          />
          <button type="submit" class="primary medium">Inviter</button>
        </form>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Membres</h4>
        <p class="small muted">{{ members.length }} membre{{ members.length > 1 ? 's' : '' }} dans l'organisation.</p>
      </div>
      <div class="settings-section-body">
        <div class="table-wrapper" style="width: 100%;">
          <table>
            <thead>
              <tr>
                <th>Membre</th>
                <th>Rôle</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in members" :key="m.id">
                <td>
                  <div class="layout-flex layout-gap-medium layout-items-center">
                    <div class="avatar">{{ m.initials }}</div>
                    <div>
                      <div style="font-weight: 500;">{{ m.name }}</div>
                      <div class="small muted">{{ m.email }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge" :class="m.role === 'Owner' ? 'badge--accent' : m.role === 'Admin' ? 'badge--success' : 'badge--muted'">
                    {{ m.role }}
                  </span>
                </td>
                <td style="text-align: right;">
                  <button
                    v-if="m.role !== 'Owner'"
                    class="ghost small"
                    @click="removeMember(m.id)"
                    style="color: var(--destructive-color);"
                  >
                    Retirer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </SettingsLayout>
</template>
