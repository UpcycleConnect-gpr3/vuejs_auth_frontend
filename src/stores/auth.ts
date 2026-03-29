import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/api.ts'
import type { AuthCredentials, AuthResponse } from '@/types/auth.ts'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoading = ref<Boolean>(false)
    const error = ref<string | null | unknown>(null)

    const bearerToken = ref<string>('')
    const isAuthenticated = computed(() => !!bearerToken.value)

    const login = async (credentials: AuthCredentials) => {
      isLoading.value = true
      error.value = null

      try {
        const response = await api.post<AuthResponse>('/auth/login/', credentials)
        bearerToken.value = response.data.bearer_token
        await cookieStore.set({name: 'bearer_token', value: bearerToken.value})
        isLoading.value = false
      } catch (err) {
        console.error('Error:', err)
        error.value = 'Error to get bearer token'
      } finally {
        isLoading.value = false
      }
    }

    const register = async (credentials: AuthCredentials) => {
      isLoading.value = true
      error.value = null

      try {
        const response = await api.post<AuthResponse>('/auth/register/', credentials)
        bearerToken.value = response.data.bearer_token
        isLoading.value = false
      } catch (err) {
        console.error('Error:', err)
        error.value = 'Error to register'
      } finally {
        isLoading.value = false
      }
    }

    return {
      error,
      bearerToken,
      isAuthenticated,
      isLoading,
      login,
      register,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['bearerToken'],
    },
  },
)
