<script setup lang="ts">
import { reactive } from 'vue'
import SettingsLayout from '@/components/SettingsLayout.vue'

const form = reactive({
  firstname: 'Jean',
  lastname: 'Dupont',
  username: 'jeandupont',
  bio: '',
})
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Profil</span>
      <h1>Informations personnelles</h1>
      <p class="muted measure">Gérez la manière dont vous apparaissez aux autres utilisateurs d'UpcycleConnect.</p>
    </header>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Photo de profil</h4>
        <p class="small muted">JPG ou PNG. 1 Mo max.</p>
      </div>
      <div class="settings-section-body">
        <div class="layout-flex layout-gap-large layout-items-center">
          <div class="avatar-placeholder">JD</div>
          <div class="layout-flex layout-gap-medium">
            <button class="primary small">Changer la photo</button>
            <button class="ghost small">Supprimer</button>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Identité</h4>
        <p class="small muted">Votre prénom, nom et pseudonyme.</p>
      </div>
      <div class="settings-section-body">
        <form class="layout-flex layout-columns layout-gap-medium">
          <div class="layout-flex layout-gap-medium">
            <div class="form-group" style="flex: 1;">
              <label for="firstname">Prénom</label>
              <input id="firstname" v-model="form.firstname" type="text" class="primary medium full-width" />
            </div>
            <div class="form-group" style="flex: 1;">
              <label for="lastname">Nom</label>
              <input id="lastname" v-model="form.lastname" type="text" class="primary medium full-width" />
            </div>
          </div>
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input id="username" v-model="form.username" type="text" class="primary medium full-width" placeholder="@jeandupont" />
          </div>
        </form>
      </div>
    </section>

    <div class="divider"></div>

    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Bio</h4>
        <p class="small muted">Une courte description publique de vous.</p>
      </div>
      <div class="settings-section-body">
        <div class="form-group">
          <label for="bio">À propos de vous</label>
          <textarea id="bio" v-model="form.bio" class="primary full-width" rows="5" placeholder="Parlez-nous de vous..."></textarea>
        </div>
      </div>
    </section>

    <footer class="settings-footer">
      <button class="ghost medium">Annuler</button>
      <button class="primary medium">Sauvegarder</button>
    </footer>
  </SettingsLayout>
</template>
