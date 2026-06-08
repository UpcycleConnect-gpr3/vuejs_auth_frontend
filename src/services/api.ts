// services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Reads the JWT stored in the `bearer_token` cookie.
 * The backend expects the raw token in the `Authorization` header (no `Bearer ` prefix).
 */
function getTokenFromCookies(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)bearer_token=([^;]*)/)
  return match && match[1] ? decodeURIComponent(match[1]) : null
}

api.interceptors.request.use((config) => {
  const token = getTokenFromCookies()
  if (token) {
    config.headers.set('Authorization', token)
  }
  return config
})

export default api
