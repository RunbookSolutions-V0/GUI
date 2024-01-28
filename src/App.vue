<template>
  <AuthLayout v-if="authStore.user">
    <RouterView :key="$route.fullPath" />
  </AuthLayout>
  <template v-else>
    <RouterView />
  </template>

  <Toast />
  <PVDynamicDialog />
</template>

<script setup lang="ts">
// Vue
import { watch } from 'vue'
import { RouterView } from 'vue-router'

// PrimeVue
import PVDynamicDialog from 'primevue/dynamicdialog'
import Toast, { type ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

// Stores
import { useAuthStore, useAlertStore } from '@/stores'
const authStore = useAuthStore()
const alertStore = useAlertStore()

// Our Components
import AuthLayout from './layout/AuthLayout.vue'

// Watchers
watch(
  alertStore,
  () => {
    while (alertStore.alerts.length > 0) {
      const alert = {
        life: 5000,
        ...alertStore.alerts.pop()
      } as ToastMessageOptions
      toast.add(alert)
    }
  },
  { deep: true }
)
</script>

<style scoped></style>
