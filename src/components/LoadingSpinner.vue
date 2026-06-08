<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
  }>(),
  { size: 20 },
)
</script>

<template>
  <span
    class="loading-spinner"
    role="status"
    aria-label="Chargement"
    :style="{ width: `${size}px`, height: `${size}px` }"
  ></span>
</template>

<style scoped>
.loading-spinner {
  display: inline-block;
  border: 2px solid oklch(from var(--foreground-color) l c h / 0.2);
  border-top-color: var(--lime-500);
  border-radius: 50%;
  animation: loading-spin 0.7s linear infinite;
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
