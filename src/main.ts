import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth.ts'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// pinia-persistedstate has already rehydrated bearerToken from localStorage here.
// Re-write the cookie so the interceptor and the router guard never disagree after
// a fresh browser session.
const authStore = useAuthStore()
if (authStore.bearerToken) {
  authStore.setToken(authStore.bearerToken)
}

app.mount('#app')
