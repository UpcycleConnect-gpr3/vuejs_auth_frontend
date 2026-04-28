import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/api.ts'
import type {
  AuthCredentials,
  LoginResponse,
  RegisterResponse,
  TotpLoginCredentials,
  TotpLoginResponse,
} from '@/types/auth.ts'
import type { ApiError, ApiResponse } from '@/types/api.ts'
import type { Router } from 'vue-router'
import { useApiErrors } from '@/composables/useApiErrors'

const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN
const COOKIE_PATH = import.meta.env.VITE_COOKIE_PATH

declare const cookieStore: {
  set: (name: string, value: string, options?: { domain?: string; path?: string }) => Promise<void>
  get: (name: string) => Promise<{ value?: string } | undefined>
  delete: (name: string, options?: { domain?: string }) => Promise<void>
}

export const useAuthStore = defineStore('auth', () => {
  const { fieldErrors, setFieldErrors, clearFieldErrors } = useApiErrors()

  const bearerToken = ref<string>('')
  const hash = ref<string>('')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const isAuthenticated = computed(() => !!bearerToken.value)

  const setToken = async (token: string) => {
    bearerToken.value = token
    await cookieStore.set('bearer_token', token, { domain: COOKIE_DOMAIN, path: COOKIE_PATH })
  }

  const clearToken = async () => {
    bearerToken.value = ''
    await cookieStore.delete('bearer_token', { domain: COOKIE_DOMAIN })
  }

  const setHash = (newHash: string) => { hash.value = newHash }
  const clearError = () => {
    error.value = null
    clearFieldErrors()
  }
  const setError = (message: string) => { error.value = message }
  const setLoading = (state: boolean) => { isLoading.value = state }

  const login = async (credentials: AuthCredentials, router: Router) => {
    setLoading(true)
    clearError()

    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login/', credentials)
      if (!response.data.success) throw new Error('La requête a échouée.')

      const { bearer_token, hash: responseHash } = response.data.data
      if (bearer_token) {
        await setToken(bearer_token)
      } else if (responseHash) {
        setHash(responseHash)
        await router.push({ name: 'a2f-code' })
      }
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
    } finally {
      setLoading(false)
    }
  }

  const loginTotp = async (credentials: TotpLoginCredentials, router: Router) => {
    setLoading(true)
    clearError()

    try {
      const response = await api.post<ApiResponse<TotpLoginResponse>>(
        '/auth/login-totp/',
        credentials,
      )
      if (!response.data.success || !response.data.data.bearer_token) {
        throw new Error('Code TOTP invalide.')
      }

      await setToken(response.data.data.bearer_token)
      setHash('')
      await router.push({ path: '/' })
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
    } finally {
      setLoading(false)
    }
  }

  const logout = async (router: Router) => {
    await clearToken()
    await router.push({ name: 'login' })
  }

  const register = async (credentials: AuthCredentials, router: Router) => {
    setLoading(true)
    clearError()

    try {
      const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register/', credentials)
      if (!response.data.success) throw new Error('La requête a échouée.')

      await router.push({ name: 'login' })
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data
      setError(apiError?.message || 'Une erreur est survenue')
      setFieldErrors(apiError)
    } finally {
      setLoading(false)
    }
  }

  return {
    bearerToken,
    hash,
    isLoading,
    error,
    isAuthenticated,
    setToken,
    clearToken,
    setHash,
    clearError,
    setError,
    setLoading,
    fieldErrors,
    login,
    loginTotp,
    logout,
    register,
  }
}, {
  persist: { storage: localStorage, pick: ['bearerToken'] },
})
