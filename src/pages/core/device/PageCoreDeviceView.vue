<template>
    <WidgetsPage
        page="core-device-view" 
        :default-layouts="layouts"
        :page-content="pageContent"
    />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'

// Widgets
import type { AllTypes as T } from "s7k-widgets-core";
import { v4 as uuidv4 } from "uuid";

// GraphQL
import gql from "graphql-tag";
import type { CoreDevice } from "@/graphql";
import { useCoreDeviceSingleQuery, useCoreDeviceUpdateMutation } from "@/graphql";

// Define our Reactive Variables
//TODO: Define Page Content
const pageContent = ref<{data: any, update: any}>({
    data: null,
    update: null
});

// GraphQL
// Get Data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
    query coreDeviceSingle($id: ID) {
      core {
        device {
          single(id: $id) {
            created_at
            description
            hostname
            id
            name
            type
            updated_at
          }
        }
      }
    }`;
const { loading, error, onResult } = useCoreDeviceSingleQuery({ id: useRoute().params.id });
onResult((result) => {
    if(!result.data) return;
    const device = result.data.core.device.single as CoreDevice;
    if(!device) return;
    pageContent.value.data = device;
});
// Allow for Updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
    mutation coreDeviceUpdate($input: CoreDeviceUpdateInput!) {
      core {
        device {
          update(input: $input) {
            id
          }
        }
      }
    }`;
const { mutate, onDone, onError } = useCoreDeviceUpdateMutation();
pageContent.value.update = mutate;
onDone((result) => {
    if (!result.data) return;
    const device = result.data.core.device.update;
    if (!device) return;
    console.log("Mutation Complete. Updated Device:")
    console.log(device);
    refetch()
});
onError((result) => {
    console.log("Error Updating Device!");
    console.log(result);
});

// Default Widget Page Layouts
const layouts = [
    {
        id: "0000-000-000-0000",
        name: "Default Device View",
        default: false,
        grid: {
            id: uuidv4(),
            items: [
                {
                    name: "Empty Widget",
                    widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    i: uuidv4(),
                    moved: false,
                }
            ],
        },
        hasTabs: false,
        tabs: [],
    } as T.LayoutPage
];
</script>
