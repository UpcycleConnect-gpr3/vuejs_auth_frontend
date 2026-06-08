<script setup lang="ts">
import AppModal from '@/components/AppModal.vue'

withDefaults(
  defineProps<{
    open: boolean
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    destructive?: boolean
  }>(),
  {
    confirmLabel: 'Confirmer',
    cancelLabel: 'Annuler',
    destructive: false,
  },
)

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <AppModal :open="open" :title="title" @close="emit('cancel')">
    <p class="muted">{{ message }}</p>

    <template #footer>
      <button type="button" class="ghost medium" @click="emit('cancel')">{{ cancelLabel }}</button>
      <button
        type="button"
        class="medium"
        :class="destructive ? 'destructive' : 'primary'"
        @click="emit('confirm')"
      >
        {{ confirmLabel }}
      </button>
    </template>
  </AppModal>
</template>
