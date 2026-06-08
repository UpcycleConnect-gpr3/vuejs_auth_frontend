import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/api.ts'
import type {
  AuthCredentials,
  LoginResponse,
  RegisterResponse,
  TotpLoginCredentials,
  TotpLoginResponse,
  TotpSetupResponse,
} from '@/types/auth.ts'
import type { ApiError, ApiResponse } from '@/types/api.ts'
import type { Router } from 'vue-router'
import { useApiErrors } from '@/composables/useApiErrors'

const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN
const COOKIE_PATH = import.meta.env.VITE_COOKIE_PATH

export const useAuthStore = defineStore(
  'auth',
  () => {
    const { fieldErrors, setFieldErrors, clearFieldErrors } = useApiErrors()

    const bearerToken = ref<string>('')
    const hash = ref<string>('')
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)
    const isAuthenticated = computed(() => !!bearerToken.value)

    const setToken = (token: string) => {
      bearerToken.value = token
      document.cookie =
        `bearer_token=${encodeURIComponent(token)}; ` +
        `domain=${COOKIE_DOMAIN}; path=${COOKIE_PATH}; ` +
        `Max-Age=86400; SameSite=Lax`
    }

    const clearToken = () => {
      bearerToken.value = ''
      document.cookie =
        `bearer_token=; domain=${COOKIE_DOMAIN}; path=${COOKIE_PATH}; ` + `Max-Age=0; SameSite=Lax`
    }

    const setHash = (newHash: string) => {
      hash.value = newHash
    }
    const clearError = () => {
      error.value = null
      clearFieldErrors()
    }
    const setError = (message: string) => {
      error.value = message
    }
    const setLoading = (state: boolean) => {
      isLoading.value = state
    }

    const login = async (credentials: AuthCredentials, router: Router) => {
      setLoading(true)
      clearError()

      try {
        const response = await api.post<ApiResponse<LoginResponse>>('/auth/login/', credentials)
        if (!response.data.success) throw new Error('La requête a échouée.')

        const { bearer_token, hash: responseHash } = response.data.data
        if (bearer_token) {
          setToken(bearer_token)
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

        setToken(response.data.data.bearer_token)
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
      clearToken()
      await router.push({ name: 'login' })
    }

    const register = async (credentials: AuthCredentials, router: Router) => {
      setLoading(true)
      clearError()

      try {
        const response = await api.post<ApiResponse<RegisterResponse>>(
          '/auth/register/',
          credentials,
        )
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

    // ── TOTP setup (authenticated) ──────────────────────────────────────────
    // GET /auth/totp/ -> { totp_url } : returns the otpauth:// URI to provision an
    // authenticator app. Throws the backend message on failure so callers can react.
    const setupTotp = async (): Promise<string> => {
      const response = await api.get<ApiResponse<TotpSetupResponse>>('/auth/totp/')
      if (!response.data.success || !response.data.data.totp_url) {
        throw new Error('Impossible de récupérer la configuration 2FA.')
      }
      return response.data.data.totp_url
    }

    // POST /auth/totp/ { code } : validates the 6-digit code and enables 2FA.
    const verifyTotp = async (code: string): Promise<void> => {
      const response = await api.post<ApiResponse<unknown>>('/auth/totp/', { code })
      if (!response.data.success) {
        throw new Error('Code TOTP invalide.')
      }
    }

    return {
      bearerToken,
      hash,
      isLoading,
      error,
      isAuthenticated,
      setupTotp,
      verifyTotp,
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
  },
  {
    persist: { storage: localStorage, pick: ['bearerToken'] },
  },
)
