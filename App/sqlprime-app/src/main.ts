import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import stores
import { useAuthStore } from './stores/auth'
import { useUIStore } from './stores/ui'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// Initialize stores
authStore.init()
uiStore.init()
app.mount('#app')
