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
const COOKIE_PATH = import.meta.env.VITE_COOKIE_PATH || '/'
const TOKEN_COOKIE_NAME = 'bearer_token'

declare const cookieStore: {
  set: (name: string, value: string, options?: { domain?: string; path?: string }) => Promise<void>
  get: (name: string) => Promise<{ value?: string } | undefined>
  delete: (name: string, options?: { domain?: string }) => Promise<void>
}

// La Cookie Store API n'existe que sur les navigateurs Chromium (Chrome/Edge).
// Sur Firefox/Safari on retombe sur document.cookie : sans ce fallback, le cookie
// de session n'est jamais écrit et le SSO vers le front Upcycle casse.
const hasCookieStore = (): boolean =>
  typeof globalThis !== 'undefined' && 'cookieStore' in globalThis

// localhost/127.0.0.1 : un cookie avec l'attribut Domain est rejeté par les
// navigateurs (pas de TLD). On le pose donc en host-only — il reste partagé
// entre tous les ports de l'hôte (donc :4284 ↔ :5173). Pour un vrai domaine
// (prod), on conserve Domain pour le partage entre sous-domaines.
const cookieDomainAttr = (): string => {
  if (!COOKIE_DOMAIN || COOKIE_DOMAIN === 'localhost' || COOKIE_DOMAIN === '127.0.0.1') return ''
  return `; domain=${COOKIE_DOMAIN}`
}

const writeCookieFallback = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=${COOKIE_PATH}${cookieDomainAttr()}`
}

const deleteCookieFallback = (name: string) => {
  document.cookie = `${name}=; path=${COOKIE_PATH}${cookieDomainAttr()}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
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
    if (hasCookieStore()) {
      await cookieStore.set(TOKEN_COOKIE_NAME, token, { domain: COOKIE_DOMAIN, path: COOKIE_PATH })
    } else {
      writeCookieFallback(TOKEN_COOKIE_NAME, token)
    }
  }

  const clearToken = async () => {
    bearerToken.value = ''
    if (hasCookieStore()) {
      await cookieStore.delete(TOKEN_COOKIE_NAME, { domain: COOKIE_DOMAIN })
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

  // Vérifie que le token persisté est toujours accepté par l'API avant tout
  // auto-redirect vers le front Upcycle ; resynchronise le cookie partagé si
  // valide, purge la session sinon (token expiré, backend redémarré…).
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
    verifySession,
  }
}, {
  persist: { storage: localStorage, pick: ['bearerToken'] },
})
