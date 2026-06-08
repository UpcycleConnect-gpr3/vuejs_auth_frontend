<script setup lang="ts">
import { useToastsStore } from '@/stores/toasts.ts'

const toasts = useToastsStore()
</script>

<template>
  <Teleport to="body">
    <div class="toast-host" aria-live="polite" aria-atomic="false">
      <div
        v-for="toast in toasts.items"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
        role="status"
      >
        <span class="toast-message">{{ toast.message }}</span>
        <button
          type="button"
          class="toast-close"
          aria-label="Fermer"
          @click="toasts.remove(toast.id)"
        >
          ×
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-host {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: min(360px, calc(100vw - var(--space-8)));
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background-color: var(--green-800);
  border: 1px solid var(--green-600);
  color: var(--foreground-color);
  font-size: var(--font-size-small);
  box-shadow: 0 8px 24px oklch(from var(--black) l c h / 0.25);
}

.toast--success {
  border-color: var(--lime-500);
  background-color: oklch(from var(--lime-500) l c h / 0.1);
}

.toast--error {
  border-color: var(--destructive-color);
  background-color: oklch(from var(--destructive-color) l c h / 0.1);
}

.toast--info {
  border-color: var(--accent-color);
  background-color: oklch(from var(--accent-color) l c h / 0.1);
}

.toast-message {
  flex: 1;
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  font-size: var(--font-size-large);
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.toast-close:hover {
  color: var(--foreground-color);
}
</style>
