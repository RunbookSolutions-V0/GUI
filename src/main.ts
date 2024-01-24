import { createApp } from 'vue'
// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Apollo
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './graphql/apollo.client'

// PrimeVue
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Wind from '@/presets/wind'

// Widgets
import WidgetsPlugin from 's7k-widgets-core'
import 's7k-widgets-core/dist/widgets-core.css'

import applicationWidgets from '@/widgets'

// Application
import './assets/main.css'
import App from './App.vue'
import router from './router'

// Create Vue App
const app = createApp(App)

// Add the Router
app.use(router)

// Add Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Provide and Use Apollo
app.provide(DefaultApolloClient, apolloClient)

// Setup PrimeVue
app.use(PrimeVue, {
  unstyled: true,
  pt: Wind
})
app.use(DialogService)
app.use(ToastService)

// Widgets
app.use(WidgetsPlugin, {
  widgets: applicationWidgets
})

// Mount the App
app.mount('#app')
