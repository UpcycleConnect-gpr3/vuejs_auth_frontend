import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { ApiError, ApiResponse } from '@/types/api.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { useApiErrors } from '@/composables/useApiErrors'

interface TotpData {
  totp_url: string
}

interface TotpEnableResponse {
  success: boolean
  message: string
}

export const useTotpStore = defineStore('totp', () => {
  const { fieldErrors, setFieldErrors, clearFieldErrors } = useApiErrors()
  const authStore = useAuthStore()

  const totpUrl = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  authApi.interceptors.request.use((config) => {
    if (authStore.bearerToken) {
      config.headers.Authorization = `${authStore.bearerToken}`
    }
    return config
  })

  const resetError = () => {
    error.value = null
    clearFieldErrors()
  }

  const setError = (message: string) => {
    error.value = message
  }

  const setLoading = (state: boolean) => {
    isLoading.value = state
  }

  const fetchTotpUrl = async (): Promise<string | null> => {
    setLoading(true)
    resetError()

    try {
      const response = await authApi.get<ApiResponse<TotpData>>('/auth/totp/')
      if (!response.data.success) throw new Error('La requête a échouée.')

      totpUrl.value = response.data.data.totp_url
      return response.data.data.totp_url
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }

  const enableTotp = async (code: string): Promise<boolean> => {
    setLoading(true)
    resetError()

    try {
      const response = await authApi.post<ApiResponse<TotpEnableResponse>>('/auth/totp/', { code })
      if (!response.data.success) throw new Error(response.data.data.message || 'La requête a échouée.')

      return true
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
      return false
    } finally {
      setLoading(false)
    }
  }

  const clearTotpUrl = () => {
    totpUrl.value = null
  }

  return {
    totpUrl,
    isLoading,
    error,
    fieldErrors,
    fetchTotpUrl,
    enableTotp,
    clearTotpUrl,
    resetError,
    setError,
    setLoading,
  }
})
