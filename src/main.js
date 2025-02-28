import './assets/main.css'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
})

const auth = useAuthStore()
auth.attempt() // Initializes user values

app.mount('#app')