import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  type: ToastType
  message: string
}

export const useToastsStore = defineStore('toasts', () => {
  const items = ref<Toast[]>([])
  let nextId = 0

  const remove = (id: number) => {
    items.value = items.value.filter((t) => t.id !== id)
  }

  const push = (toast: { type: ToastType; message: string; timeout?: number }) => {
    const id = nextId++
    items.value.push({ id, type: toast.type, message: toast.message })
    const timeout = toast.timeout ?? 4000
    if (timeout > 0) {
      window.setTimeout(() => remove(id), timeout)
    }
    return id
  }

  return { items, push, remove }
})
