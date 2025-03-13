import './assets/main.css'

// Comment out PrimeVue styles for now until we can properly resolve the imports
// We'll add these back when we have the correct paths
// import 'primevue/resources/themes/lara-light-blue/theme.css'
// import 'primevue/resources/primevue.min.css'
// import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// Import stores
import { useAuthStore } from './stores/auth'
import { useUIStore } from './stores/ui'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue)

// Initialize stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// Initialize stores
authStore.init()
uiStore.init()
app.mount('#app')
