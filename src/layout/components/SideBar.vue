<template>
    <aside
        class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in">
        <VPMenu 
            :model="items"
            :ptOptions="{ mergeProps: true, mergeSections: true }" 
            :pt="{ root: 'flex flex-col h-full rounded-none', menu: 'flex-grow' }"
            class="w-full md:w-[17rem]"
        >
           <template #start>
                <span class="inline-flex items-center justify-center gap-1 px-2 py-2 w-full sm:w-[15rem]">
                    <img 
                        v-if="settings.darkMode"
                        src="../../assets/logo-dark.svg" 
                        class="h-24" 
                        alt="Logo"
                    />
                    <img 
                        v-if="!settings.darkMode"
                        src="../../assets/logo.svg" 
                        class="h-24" 
                        alt="Logo"
                    />
                </span>
            </template>

            <template #submenuheader="{ item }">
                <span class="text-primary-500 dark:text-primary-400 font-bold leading-none">{{ item.label }}</span>
            </template>

            <template #item="{ item, props }">
                <PVPanelMenu
                    :model="[item]"
                    v-if="item.items"
                />
                <template v-else>
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </template>
            </template>
            <!-- <template #end>
                <div class="mt-auto">
                    <button v-ripple
                        class="relative overflow-hidden w-full p-link flex items-center p-2 pl-3 text-surface-700 dark:text-surface-0/80 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-none">
                        <Avatar image="/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                        <span class="inline-flex flex-col justify-start">
                            <span class="font-bold">Amy Elsner</span>
                            <span class="text-sm">Admin</span>
                        </span>
                    </button>
                </div>
            </template> -->
        </VPMenu>
    </aside>
</template>
<script setup lang="ts">
import { ref } from "vue";
import PVPanelMenu from 'primevue/panelmenu';
import VPMenu from 'primevue/menu';

import { useSettingsStore } from "@/stores";
const settings = useSettingsStore();

const items = ref([
    {
                label: 'Dashboard',
                icon: 'pi pi-home',
                route: { name: "dashboard" },
    },
    {
        label: 'Data',
        items: [
            {
                label: 'Locations',
                route: { name: "core.location.list" },
            },
            {
                label: 'Networks',
                route: { name: "core.network.list" },
            },
            {
                label: 'Devices',
                route: { name: "core.device.list" },
            },
            {
                label: 'Contacts',
                route: { name: "core.contact.list" },
            },
        ]
    },
    {
        label: 'Automation',
        items: [
            {
                label: 'Network Agents',
                items: [
                    {
                        label: 'Agents',
                    },
                    {
                        label: 'Plugins',
                        items: [
                            {
                                label: 'Team Plugins',
                            },
                            {
                                label: 'Public Plugins'
                            }
                        ]
                    },
                    {
                        label: 'Tasks'
                    }
                ]
            },
        ]
    }
]);
</script>