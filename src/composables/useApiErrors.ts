import { ref } from 'vue'
import type { ApiError } from '@/types/api'

export const useApiErrors = () => {
  const fieldErrors = ref<Record<string, string>>({})

  const setFieldErrors = (apiError?: ApiError) => {
    fieldErrors.value = apiError?.errors?.reduce((acc, err) => {
      acc[err.field] = err.message
      return acc
    }, {} as Record<string, string>) || {}
  }

  const clearFieldErrors = () => {
    fieldErrors.value = {}
  }

  return {
    fieldErrors,
    setFieldErrors,
    clearFieldErrors,
  }
}
