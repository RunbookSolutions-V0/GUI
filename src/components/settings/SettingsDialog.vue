<template>
    <div>
        <p>Backend Server</p>
        <PVAutoComplete 
            v-model="settingStore.backend" 
            :suggestions="applicationBackends"
            dropdownMode="current"
            @complete="search"
            :dropdown="true"
        />
    </div>
    <div>
        <p>Poll Interval (Minutes)</p>
        <PVInputNumber v-model="settingStore.pollInterval" showButtons buttonLayout="vertical" style="width: 4rem" decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary">
            <template #incrementbuttonicon>
                <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
                <span class="pi pi-minus" />
            </template>
        </PVInputNumber>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// PrimeVue
import PVAutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import PVInputNumber from 'primevue/inputnumber'

// Stores
import { useSettingsStore } from '@/stores';
const settingStore = useSettingsStore();

const applicationBackends = ref<string[]>([])

const search = (event: AutoCompleteCompleteEvent) => {
    applicationBackends.value = [
        'https://graphql.runbook.solutions',
        'https://graphql.dev.runbook.solutions'
    ]
}

// Injections
//const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
</script>