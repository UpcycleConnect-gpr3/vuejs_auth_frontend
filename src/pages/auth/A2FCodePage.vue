<script setup lang="ts">
import { ref } from 'vue'

const code = ref(['', '', '', ''])

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()

    const digits = text.replace(/\D/g, '').slice(0, 4)

    if (digits.length === 4) {
      code.value = digits.split('')
    }
  } catch (err) {
    console.error('Accès au presse-papier refusé', err)
  }
}

const handlePaste = (e: ClipboardEvent) => {
  const text = e.clipboardData?.getData('text') || ''
  const digits = text.replace(/\D/g, '').slice(0, 4)

  if (digits.length === 4) {
    code.value = digits.split('')
    e.preventDefault()
  }
}
</script>
<template>
  <div>
    <h1>Vérification du compte</h1>
    <p>Entrez le code à 4 chiffres envoyé à votre email.</p>

    <form>
      <div>
        <input
          v-for="(_, i) in code"
          :key="i"
          v-model="code[i]"
          type="text"
          maxlength="1"
          @focus="i === 0 && pasteFromClipboard()"
          @paste="(e) => handlePaste(e)"
        />
      </div>

      <button type="submit">Vérifier</button>
    </form>

    <router-link to="/login">Retour à la connexion</router-link>
  </div>
</template>
