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
    <div class="forgot-password-page">
        <div class="forgot-password-card">
            <h1>Mot de passe oublié</h1>
            <p>Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>

            <div v-if="submitted">
                <p>
                    Un email a été envoyé à <strong>{{ form.email }}</strong
                    >.
                </p>
                <a href="/login">Retour à la connexion</a>
            </div>

            <form v-else @submit.prevent="handleForgotPassword">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="vous@exemple.com"
                        required
                    />
                </div>

                <button type="submit">Envoyer le lien</button>

                <div>
                    <a href="/login">Retour à la connexion</a>
                </div>
            </form>
        </div>
    </div>
</template>
