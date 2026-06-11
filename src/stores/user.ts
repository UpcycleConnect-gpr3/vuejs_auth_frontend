import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'
import type { User } from '@/types/user.ts'
import type { ApiError, ApiResponse } from '@/types/api.ts'
import { useApiErrors } from '@/composables/useApiErrors'
import { useAuthStore } from '@/stores/auth.ts'

export const useUserStore = defineStore('user', () => {
  const { fieldErrors, setFieldErrors, clearFieldErrors } = useApiErrors()
  const authStore = useAuthStore()

  const user = ref<User | null>(null)
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

  const fullName = computed<string | null>(() => {
    if (!user.value?.firstname && !user.value?.lastname) return null
    return [user.value?.firstname, user.value?.lastname].filter(Boolean).join(' ') || null
  })

  const isProfileComplete = computed<boolean>(() => {
    return !!(user.value?.email && user.value?.firstname && user.value?.lastname)
  })

  const setUser = (data: User | null) => {
    user.value = data
  }

  const clearUser = () => {
    user.value = null
  }

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

  const fetchUser = async (): Promise<User | null> => {
    setLoading(true)
    resetError()

    try {
      const response = await authApi.get<ApiResponse<User>>('/user/me')
      if (!response.data.success) throw new Error('La requête a échouée.')

      setUser(response.data.data)
      return response.data.data
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (data: { firstname?: string; lastname?: string; email?: string }): Promise<User | null> => {
    setLoading(true)
    resetError()

    try {
      const response = await authApi.patch<ApiResponse<User>>('/user/', data)
      if (!response.data.success) throw new Error('La requête a échouée.')

      setUser(response.data.data)
      return response.data.data
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (password: string): Promise<User | null> => {
    setLoading(true)
    resetError()

    try {
      const response = await authApi.patch<ApiResponse<User>>('/user/', { password })
      if (!response.data.success) throw new Error('La requête a échouée.')

      return response.data.data
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (): Promise<boolean> => {
    setLoading(true)
    resetError()

    try {
      const response = await authApi.delete<{ success: boolean; message: string }>('/user/')
      if (!response.data.success) throw new Error(response.data.message || 'La requête a échouée.')

      clearUser()
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

  return {
    user,
    isLoading,
    error,
    fieldErrors,
    fullName,
    isProfileComplete,
    fetchUser,
    updateUser,
    updatePassword,
    deleteUser,
    setUser,
    clearUser,
    resetError,
    setError,
    setLoading,
  }
}, {
  persist: { storage: sessionStorage, pick: ['user'] },
})
