<template>
    <WidgetsPage
        page="core-location-view" 
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
import type { CoreLocation } from "@/graphql";
import { useCoreLocationSingleQuery, useCoreLocationUpdateMutation } from "@/graphql";

// Define our Reactive Variables
//TODO: Define Page Content
const pageContent = ref<{data: any, update: any}>({
    data: null,
    update: null
});

// GraphQL
// Get Data
const GraphQLDocument1 = gql`
query coreLocationSingle($id: ID) {
  core {
    location {
      single(id: $id) {
        id
        type
        name
        description
        parent_id
        parent_location {
          id
          name
          type
        }
        address

        created_at
        updated_at        
      }
    }
  }
}`;
const { loading, error, onResult } = useCoreLocationSingleQuery({ id: useRoute().params.id });
onResult((result) => {
    if(!result.data) return;
    const location = result.data.core.location.single as CoreLocation;
    if(!location) return;
    pageContent.value.data = location;
});
// Allow for Updates
const GraphQLDocument2 = gql`
mutation coreLocationUpdate($input: CoreLocationUpdateInput!) {
  core {
    location {
      update(input: $input) {
        id
      }
    }
  }
}`;
const { mutate, onDone, onError } = useCoreLocationUpdateMutation();
pageContent.value.update = mutate;
onDone((result) => {
    if (!result.data) return;
    const location = result.data.core.location.update;
    if (!location) return;
    console.log("Mutation Complete. Updated Location:")
    console.log(location);
    refetch()
});
onError((result) => {
    console.log("Error Updating Location!");
    console.log(result);
});

// Default Widget Page Layouts
const layouts = [
    {
        id: "0000-000-000-0000",
        name: "Default Location View",
        default: false,
        grid: {
            id: uuidv4(),
            items: [
                {
                    name: "Location Details",
                    widgetID: "e5adbb57-66c1-4e15-8729-139da67792d1",
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 3,
                    i: uuidv4(),
                    moved: false,
                },
                // {
                //     name: "Location Address",
                //     widgetID: "b1ae17db-c300-4be8-8664-b4bc8eb6b10c",
                //     x: 1,
                //     y: 0,
                //     h: 3,
                //     w: 2,
                //     i: uuidv4(),
                //     moved: false,
                // }499c1a07-4dbe-457f-aac3-1570e6341a8d
                {
                    name: "Location Tree",
                    widgetID: "499c1a07-4dbe-457f-aac3-1570e6341a8d",
                    x: 1,
                    y: 0,
                    h: 3,
                    w: 2,
                    i: uuidv4(),
                    moved: false,
                },
            ],
        },
        hasTabs: false,
        tabs: [],
    } as T.LayoutPage
];
</script>