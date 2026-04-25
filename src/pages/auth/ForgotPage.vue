<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const form = ref({ email: '' })
const submitted = ref(false)

function handleForgotPassword() {
  console.log('email:', form.value.email)
  submitted.value = true
}
</script>

<template>
  <main class="auth-shell">
    <div class="auth-card">
      <div class="auth-card-head">
        <RouterLink to="/" class="logo">
          <div class="logo-dot"></div>
          <span>UpcycleConnect</span>
        </RouterLink>
        <span class="eyebrow">Récupération</span>
        <h1 class="bold">Mot de passe<br />oublié ?</h1>
        <p class="muted measure">Entrez votre email pour recevoir un lien de réinitialisation.</p>
      </div>

      <div v-if="submitted" class="auth-form">
        <div class="auth-success">
          <p>
            Un email a été envoyé à <strong class="text-secondary">{{ form.email }}</strong>.
          </p>
          <p class="small muted">Vérifiez votre boîte de réception et cliquez sur le lien reçu.</p>
        </div>
        <RouterLink to="/auth/login" class="outline medium full-width">Retour à la connexion</RouterLink>
      </div>

      <form v-else @submit.prevent="handleForgotPassword" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="primary medium full-width"
            placeholder="vous@exemple.com"
            autocomplete="email"
            required
          />
        </div>

        <button type="submit" class="primary medium full-width">Envoyer le lien</button>
      </form>

      <div class="auth-card-foot">
        <p class="small muted center">
          <RouterLink to="/auth/login" class="ghost" style="display: inline; padding: 0;">← Retour à la connexion</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
