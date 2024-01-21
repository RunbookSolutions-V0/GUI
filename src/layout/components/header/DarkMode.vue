<template>
    <Button 
        @click="settings.toggleDarkMode()"
        rounded
        text
        label="Toggle Dark Mode"
        class="text-surface-700 dark:text-white/80 ring-0 dark:ring-0 focus:ring-0 dark:focus:ring-0"
    >
        <template v-if="settings.darkMode">
            <i class="pi pi-moon"></i>
        </template>
        <template v-if="!settings.darkMode">
            <i class="pi pi-sun"></i>
        </template>
    </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { onMounted, watch } from 'vue';

import { useSettingsStore } from "@/stores";
const settings = useSettingsStore();

onMounted(() => {
    document.body.classList.toggle("dark", settings.darkMode);
});

watch(() => settings.darkMode, () => { 
    document.body.classList.toggle("dark", settings.darkMode);
});

</script>