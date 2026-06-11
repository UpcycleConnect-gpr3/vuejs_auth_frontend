<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import SettingsLayout from '@/components/SettingsLayout.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useUserStore } from '@/stores/user.ts'

const authStore = useAuthStore()
const userStore = useUserStore()

const form = reactive({
  firstname: '',
  lastname: '',
})

const isLoading = computed(() => userStore.isLoading)
const error = computed(() => userStore.error)
const fullName = computed(() => userStore.fullName)

const loadUserData = async () => {
  await userStore.fetchUser()
  if (userStore.user) {
    form.firstname = userStore.user.firstname || ''
    form.lastname = userStore.user.lastname || ''
  }
}

const handleSave = async () => {
  await userStore.updateUser({
    firstname: form.firstname,
    lastname: form.lastname,
  })
}

onMounted(() => {
  loadUserData()
})
</script>

<template>
  <SettingsLayout>
    <header class="settings-header">
      <span class="eyebrow">Profil</span>
      <h1>Informations personnelles</h1>
      <p class="muted measure">
        Gérez la manière dont vous apparaissez aux autres utilisateurs d'UpcycleConnect.
      </p>
    </header>

    <div v-if="isLoading" class="loading-overlay">
      <p>Chargement des informations utilisateur...</p>
    </div>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="loadUserData" class="ghost small">Réessayer</button>
    </div>
    <section class="settings-section">
      <div class="settings-section-head">
        <h4>Identité</h4>
        <p class="small muted">Votre prénom et nom.</p>
      </div>
      <div class="settings-section-body">
        <form class="layout-flex layout-columns layout-gap-medium">
          <div class="layout-flex layout-gap-medium">
            <div class="form-group" style="flex: 1">
              <label for="firstname">Prénom</label>
              <input
                id="firstname"
                v-model="form.firstname"
                type="text"
                class="primary medium full-width"
              />
            </div>
            <div class="form-group" style="flex: 1">
              <label for="lastname">Nom</label>
              <input
                id="lastname"
                v-model="form.lastname"
                type="text"
                class="primary medium full-width"
              />
            </div>
          </div>
        </form>
      </div>
    </section>

    <footer class="settings-footer">
      <button class="primary medium" :disabled="isLoading" @click="handleSave">
        {{ isLoading ? 'Sauvegarde...' : 'Sauvegarder' }}
      </button>
    </footer>
  </SettingsLayout>
</template>
