<template>
    <WidgetsPage
        page="core-network-view" 
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
import type { CoreNetwork } from "@/graphql";
import { useCoreNetworkSingleQuery, useCoreNetworkUpdateMutation } from "@/graphql";

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
    query coreNetworkSingle($id: ID) {
      core {
        network {
          single(id: $id) {
            created_at
            description
            id
            mask
            name
            network
            parent_id
            updated_at
          }
        }
      }
    }`;
const { loading, error, onResult } = useCoreNetworkSingleQuery({ id: useRoute().params.id });
onResult((result) => {
    if(!result.data) return;
    const network = result.data.core.network.single as CoreNetwork;
    if(!network) return;
    pageContent.value.data = network;
});
// Allow for Updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
    mutation coreNetworkUpdate($input: CoreNetworkUpdateInput!) {
      core {
        network {
          update(input: $input) {
            id
          }
        }
      }
    }`;
const { mutate, onDone, onError } = useCoreNetworkUpdateMutation();
pageContent.value.update = mutate;
onDone((result) => {
    if (!result.data) return;
    const network = result.data.core.network.update;
    if (!network) return;
    console.log("Mutation Complete. Updated Network:")
    console.log(network);
});
onError((result) => {
    console.log("Error Updating Network!");
    console.log(result);
});

// Default Widget Page Layouts
const layouts = [
    {
        id: "0000-000-000-0000",
        name: "Default Network View",
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
