<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Password reset has no backend endpoint yet — the page is masked.
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

      <div class="auth-form">
        <div class="auth-success" style="border-color: oklch(from var(--accent-color) l c h / 0.3)">
          <p>Fonctionnalité bientôt disponible.</p>
          <p class="small muted">
            La réinitialisation du mot de passe n'est pas encore active. Contactez le support si
            vous ne pouvez pas vous connecter.
          </p>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            class="primary medium full-width"
            placeholder="vous@exemple.com"
            autocomplete="email"
            disabled
          />
        </div>

        <button type="button" class="primary medium full-width" disabled>Envoyer le lien</button>
      </div>

      <div class="auth-card-foot">
        <p class="small muted center">
          <RouterLink to="/auth/login" class="ghost" style="display: inline; padding: 0"
            >← Retour à la connexion</RouterLink
          >
        </p>
      </div>
    </div>
  </main>
</template>
