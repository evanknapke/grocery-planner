import App from './components/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize authentication and wait for it to complete
const authStore = useAuthStore()
await authStore.initializeAuth()

app.mount('#app')
