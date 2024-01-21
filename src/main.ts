import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient, apolloProvider } from "./graphql/apollo.client";

import PrimeVue from 'primevue/config';
import Wind from '@/presets/wind';

const app = createApp(App)

app.use(router)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.provide(DefaultApolloClient, apolloClient)
.use(apolloProvider)

app.use(PrimeVue, {
    unstyled: true,
    pt: Wind
});

app.mount('#app')
