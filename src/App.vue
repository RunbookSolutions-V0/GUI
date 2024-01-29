<template>
  <AuthLayout v-if="authStore.user">
    <RouterView :key="$route.fullPath" />
  </AuthLayout>
  <template v-else>
    <RouterView />
  </template>

  <div class="fixed left-5 bottom-5 z-10 ">
    <PVButton
      aria-label="Application Settings"
      icon="pi pi-cog"
      rounded
      raised
      @click="showSettings"
    />
  </div>

  <Toast />
  <PVDynamicDialog />
</template>

<script setup lang="ts">
// Vue
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'

// PrimeVue
import PVDynamicDialog from 'primevue/dynamicdialog'
import { useDialog } from 'primevue/usedialog';
import PVButton from 'primevue/button'
import Toast, { type ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

// Stores
import { useAuthStore, useAlertStore, useSettingsStore } from '@/stores'
const authStore = useAuthStore()
const alertStore = useAlertStore()
const settingsStore = useSettingsStore()

// Our Components
import AuthLayout from './layout/AuthLayout.vue'
import SettingsDialog from '@/components/settings/SettingsDialog.vue'

const dialog = useDialog()

// On Mount
onMounted(() => {
  document.body.classList.toggle('dark', settingsStore.darkMode)
})

// Watch for changes
watch(
  () => settingsStore.darkMode,
  () => {
    document.body.classList.toggle('dark', settingsStore.darkMode)
  }
)

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

// Functions
function showSettings() {
  dialog.open(SettingsDialog, { props: { header: 'Application Settings', modal: true } });
}
</script>

<style scoped></style>
