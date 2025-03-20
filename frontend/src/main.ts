import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/main.css'

// Create the Vue application
const app = createApp(App)

// Use Pinia for state management
const pinia = createPinia()
app.use(pinia)

// Use Vue Router
app.use(router)

// Mount the app to the DOM
app.mount('#app')