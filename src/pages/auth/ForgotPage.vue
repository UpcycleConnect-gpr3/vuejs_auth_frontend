<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ email: '' })
const submitted = ref(false)

function handleForgotPassword() {
  console.log('email:', form.value.email)
  submitted.value = true
  // TODO: call API
}
</script>

<template>
  <main class="layout-flex layout-columns layout-items-center layout-gap-large">
    <hgroup>
      <h1 class="semibold center">Mot de passe oublié</h1>
      <p>Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
    </hgroup>

    <div v-if="submitted" class="layout-small">
      <p>
        Un email a été envoyé à <strong>{{ form.email }}</strong
        >.
      </p>
    </div>

    <form v-else @submit.prevent="handleForgotPassword" class="layout-small">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          class="primary medium"
          id="email"
          v-model="form.email"
          type="email"
          placeholder="vous@exemple.com"
          required
        />
      </div>

      <button class="primary medium" type="submit">Envoyer le lien</button>
      <router-link class="ghost" to="login">Retour à la connexion</router-link>
    </form>
  </main>
</template>
