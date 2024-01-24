<template>
    <div class="card flex justify-center">
        
        <Button
            :pt="{root:'w-full flex'}"
            :ptOptions="{mergeProps: false}"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            text
        >
            <Avatar
                class="dark:text-white"
                :label="authStore.user?.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')"
                :image="(authStore.user?.photo as string)"
              />
              <!-- <span class="flex flex-col">
                <span class="truncate w-20 font-semibold tracking-wide leading-none">{{ authStore.user?.name }}</span>
                <span class="truncate w-20 text-gray-500 text-xs leading-none mt-1">Manager</span>
              </span> -->
        </Button>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
            <template #item="{ item, props }">
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
        </Menu>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();

import { ref } from "vue";

const menu = ref();
const items = ref([
    // {
    //     label: 'Options',
    //     items: [
    //         {
    //             label: 'Export',
    //             icon: 'pi pi-upload',
    //             route: "/"
    //         }
    //     ]
    // },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            authStore.logout();
        }
    },
]);

const toggle = (event: any) => {
    menu.value.toggle(event);
};
</script>