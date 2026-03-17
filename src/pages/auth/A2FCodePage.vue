<script setup lang="ts">
import { ref, computed } from 'vue'

const code = ref(['', '', '', ''])
</script>

<template>
  <div>
    <h1>Vérification du compte</h1>
    <p>Entrez le code à 4 chiffres envoyé à votre email.</p>

    <form>
      <div>
        <input v-for="(_, i) in code" :key="i" v-model="code[i]" type="text" maxlength="1" />
      </div>

      <button type="submit">Vérifier</button>
    </form>

    <router-link to="/login">Retour à la connexion</router-link>
  </div>
</template>
