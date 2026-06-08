/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_COOKIE_DOMAIN: string
  readonly VITE_COOKIE_PATH: string
  readonly VITE_UPCYCLE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
