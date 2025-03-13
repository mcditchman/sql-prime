import './assets/main.css'

// PrimeVue styles - using direct CSS import
import './assets/primevue-theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// Import PrimeVue components
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Divider from 'primevue/divider'
import Message from 'primevue/message'
import Password from 'primevue/password'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

// Import stores
import { useAuthStore } from './stores/auth'
import { useUIStore } from './stores/ui'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

// Register PrimeVue components globally
app.component('Button', Button)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.component('Divider', Divider)
app.component('Message', Message)
app.component('Password', Password)
app.component('Toast', Toast)

// Initialize stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// Initialize stores
authStore.init()
uiStore.init()
app.mount('#app')
