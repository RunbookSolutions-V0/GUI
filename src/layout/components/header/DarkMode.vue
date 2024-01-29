<template>
  <PVButton
    @click="settings.toggleDarkMode()"
    text
    severity="none"
    aria-label="Toggle Dark Mode"
    :icon="settings.darkMode ? 'pi pi-moon' : 'pi pi-sun'"
    class="text-surface-700 dark:text-white/80 ring-0 dark:ring-0 focus:ring-0 dark:focus:ring-0"
  >
  </PVButton>
</template>

<script setup lang="ts">
import PVButton from 'primevue/button'

import { useSettingsStore } from '@/stores'
const settings = useSettingsStore()
</script>
