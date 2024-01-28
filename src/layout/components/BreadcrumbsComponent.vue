<template>
    <PVBreadcrumb :home="home" :model="items" />
</template>
<script setup lang="ts">
import { ref } from "vue";

import PVBreadcrumb from 'primevue/breadcrumb'

const home = ref({
    icon: 'pi pi-home'
});
const items = ref([
    { label: 'Electronics' }, 
    { label: 'Computer' }, 
    { label: 'Accessories' }, 
    { label: 'Keyboard' }, 
    { label: 'Wireless' }
]);
</script>