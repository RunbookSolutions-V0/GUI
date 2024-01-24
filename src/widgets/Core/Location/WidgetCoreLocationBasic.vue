<template>
    <h1>Basic Info</h1>
    <!-- <WidgetInterface
        v-bind="$props"
    >
        <PVCard
            v-if="location"
            class="h-full w-full"
            :pt-options="{mergeProps: false, mergeSections: true}"
            :pt="{
                body: 'py-5 h-full flex flex-col',
                content: 'px-5 md:px-6 flex flex-grow',
            }"
        >
            <template #title>
                [{{ location.type }}] {{ location.name }}
            </template>
            <template #content>
                <dl>
                    <div class="px-4 py-3 sm:px-0">
                        <dt class="text-sm font-bold leading-6">Description</dt>
                        <dd class="mt-1 text-sm leading-6 sm:mt-2">{{ location.description }}</dd>
                    </div>
                    <div class="px-4 py-3 sm:px-0" v-if="location.parent_id">
                        <dt class="text-sm font-bold leading-6">Parent Location</dt>
                        <dd class="mt-1 text-sm leading-6 sm:mt-2">
                            <RouterLink
                                :to="{
                                    name: 'core.location.view',
                                    params: {
                                        id: location.parent_location?.id
                                    }
                                }"
                            >
                                [{{ location.parent_location?.type }}] {{ location.parent_location?.name }}
                            </RouterLink>
                        </dd>
                    </div>
                    <div class="px-4 py-3 sm:px-0" v-if="location.address">
                        <dt class="text-sm font-bold leading-6">Address</dt>
                        <dd class="mt-1 text-sm leading-6 sm:mt-2">{{ location.address }}</dd>
                    </div>
                </dl>
                <p class="m-0"></p>
            </template>
            <template #footer>
                <div class="grid grid-cols-2">
                    <div class="grid-col-1">
                        <dl>
                            <dt class="text-xs font-bold">Created At</dt>
                            <dd class="mt-1 text-xs">{{ location.created_at }}</dd>
                        </dl>
                    </div>
                    <div class="grid-col-1">
                        <dl>
                            <dt class="text-xs font-bold">Updated At</dt>
                            <dd class="mt-1 text-xs">{{ location.updated_at }}</dd>
                        </dl>
                    </div>
                </div>
                
            </template>
        </PVCard>
        <div v-else>
            Loading...
        </div>
    </WidgetInterface> -->
</template>
<script setup lang="ts">
// import { defineComponent } from 'vue';

// // Prime Vue
// import PVCard from 'primevue/card';

// // Widgets
// import type { AllTypes as T } from "s7k-widgets-core";
// import { WidgetInterface, defaultWidgetComponent } from "s7k-widgets-core";

// // GraphQL
// import type { CoreLocation } from "@/graphql"

// export default defineComponent({
//     name: 'WidgetCoreLocationBasic',
//     components: {
//         PVCard,

//         WidgetInterface
//     },
//     data(){
//         return {
//             location: null as CoreLocation | null,
//         }
//     },
//     props: {
//         ...defaultWidgetComponent.props as T.RequiredWidgetsProps,
//     },
//     watch: {
//         content: {
//             handler(newContent, oldContent) {
//                 this.location = newContent.data as CoreLocation
//             },
//             deep: true
//         }
//     },
// });


</script>