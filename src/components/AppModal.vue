<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  }
}

function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : ''
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', onKeydown)
      lockScroll(true)
    } else {
      document.removeEventListener('keydown', onKeydown)
      lockScroll(false)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  lockScroll(false)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal-overlay" @click.self="close">
      <div class="modal" role="dialog" aria-modal="true" :aria-label="title">
        <header v-if="title || $slots.header" class="modal-head">
          <slot name="header">
            <h4>{{ title }}</h4>
          </slot>
          <button type="button" class="modal-close" aria-label="Fermer" @click="close">×</button>
        </header>

        <div class="modal-body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="modal-foot">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background-color: oklch(from var(--black) l c h / 0.6);
}

.modal {
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - var(--space-12));
  overflow-y: auto;
  background-color: var(--green-800);
  border: 1px solid var(--green-600);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  box-shadow: 0 16px 48px oklch(from var(--black) l c h / 0.4);
}

.modal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}

.modal-head h4 {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}

.modal-close {
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  font-size: var(--font-size-xxlarge);
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.modal-close:hover {
  color: var(--foreground-color);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
</style>
