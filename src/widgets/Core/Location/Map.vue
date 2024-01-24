<template>
    <WidgetInterface
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
                {{ location.name }} Address
            </template>
            <template #content>
                <p>TODO... display a Map</p>
            </template>
        </PVCard>
        <div v-else>
            Loading...
        </div>
    </WidgetInterface>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

// Prime Vue
import PVCard from 'primevue/card';

// Widgets
import type { AllTypes as T } from "s7k-widgets-core";
import { WidgetInterface, defaultWidgetComponent } from "s7k-widgets-core";

// GraphQL
import type { CoreLocation } from "@/graphql"

export default defineComponent({
    name: 'WidgetCoreLocationMap',
    components: {
        PVCard,

        WidgetInterface
    },
    data(){
        return {
            location: null as CoreLocation | null,
        }
    },
    props: {
        ...defaultWidgetComponent.props as T.RequiredWidgetsProps,
    },
    watch: {
        content: {
            handler(newContent, oldContent) {
                this.location = newContent.data as CoreLocation
            },
            deep: true
        }
    },
});


</script>