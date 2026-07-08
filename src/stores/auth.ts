import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/api.ts'
import type {
  AuthCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  TotpLoginCredentials,
  TotpLoginResponse,
} from '@/types/auth.ts'
import type { ApiError, ApiResponse } from '@/types/api.ts'
import type { Router } from 'vue-router'
import { useApiErrors } from '@/composables/useApiErrors'

const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN
const COOKIE_PATH = import.meta.env.VITE_COOKIE_PATH || '/'
const TOKEN_COOKIE_NAME = 'bearer_token'

declare const cookieStore: {
  set: (name: string, value: string, options?: { domain?: string; path?: string }) => Promise<void>
  get: (name: string) => Promise<{ value?: string } | undefined>
  delete: (name: string, options?: { domain?: string }) => Promise<void>
}

const hasCookieStore = (): boolean =>
  typeof globalThis !== 'undefined' && 'cookieStore' in globalThis

const isRealDomain = (): boolean =>
  !!COOKIE_DOMAIN && COOKIE_DOMAIN !== 'localhost' && COOKIE_DOMAIN !== '127.0.0.1'

const cookieDomainAttr = (): string => {
  if (!isRealDomain()) return ''
  return `; domain=${COOKIE_DOMAIN}`
}

const cookieStoreOptions = () =>
  isRealDomain() ? { domain: COOKIE_DOMAIN, path: COOKIE_PATH } : { path: COOKIE_PATH }

const writeCookieFallback = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=${COOKIE_PATH}${cookieDomainAttr()}`
}

const deleteCookieFallback = (name: string) => {
  document.cookie = `${name}=; path=${COOKIE_PATH}${cookieDomainAttr()}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

export const useAuthStore = defineStore('auth', () => {
  const { fieldErrors, setFieldErrors, clearFieldErrors } = useApiErrors()

  const bearerToken = ref<string>('')
  const role = ref<string>('')
  const hash = ref<string>('')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const isAuthenticated = computed(() => !!bearerToken.value)

  const setToken = async (token: string) => {
    bearerToken.value = token
    if (hasCookieStore()) {
      await cookieStore.set(TOKEN_COOKIE_NAME, token, cookieStoreOptions())
    } else {
      writeCookieFallback(TOKEN_COOKIE_NAME, token)
    }
  }

  const clearToken = async () => {
    bearerToken.value = ''
    role.value = ''
    if (hasCookieStore()) {
      await cookieStore.delete(TOKEN_COOKIE_NAME, isRealDomain() ? { domain: COOKIE_DOMAIN } : {})
    } else {
      deleteCookieFallback(TOKEN_COOKIE_NAME)
    }
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

      const { bearer_token, hash: responseHash, role: responseRole } = response.data.data
      if (bearer_token) {
        await setToken(bearer_token)
        role.value = responseRole ?? ''
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

  const verifySession = async (): Promise<boolean> => {
    if (!bearerToken.value) return false
    try {
      const response = await api.get<ApiResponse<unknown>>('/auth/me/', {
        headers: { Authorization: bearerToken.value },
      })
      if (!response.data.success) throw new Error('Session invalide.')
      await setToken(bearerToken.value)
      return true
    } catch {
      await clearToken()
      return false
    }
  }

  const logout = async (router: Router) => {
    await clearToken()
    await router.push({ name: 'login' })
  }

  const register = async (credentials: RegisterCredentials, router: Router) => {
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
    role,
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
    verifySession,
  }
}, {
  persist: { storage: localStorage, pick: ['bearerToken', 'role'] },
})
