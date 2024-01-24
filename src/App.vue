<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'

import Toast, { type ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { useAuthStore, useAlertStore } from '@/stores'

import AuthLayout from './layout/AuthLayout.vue'

const toast = useToast()
const authStore = useAuthStore()
const alertStore = useAlertStore()

watch(
  alertStore,
  () => {
    while (alertStore.alerts.length > 0) {
      const alert = {
        ...alertStore.alerts.pop(),
        life: 3000
      } as ToastMessageOptions
      toast.add(alert)
    }
  },
  { deep: true }
)
</script>

<template>
  <AuthLayout v-if="authStore.user">
    <RouterView :key="$route.fullPath" />
  </AuthLayout>
  <template v-else>
    <RouterView />
  </template>
  <Toast />
</template>

<style scoped></style>
