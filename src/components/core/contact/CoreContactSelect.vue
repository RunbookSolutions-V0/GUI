<template>
    <div class="flex mb-2">
        <span class="relative flex-grow">
            <label 
                v-if="label"
                :for="$attrs.inputId"
                class="text-sm text-primary-500 dark:text-primary-400/60 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
                {{ label }}
            </label>
            <AutoComplete
                v-bind="$attrs"
                :suggestions="items"
                @complete="search"
                optionLabel="name"
                placeholder="Parent Company"
                forceSelection
                dropdown
                dropdownMode="current"
                :loading="loading"
            />
        </span>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import gql from "graphql-tag";

import { 
    useCoreContactSelectFilteredListQuery,
    type CoreContactSelectFilteredListQueryVariables,
    CoreContactTypes
} from "@/graphql";

// Props
const props = defineProps({
    label: {
        type: [String || null],
        default: null,
    },
    type: {
        type: String as CoreContactTypes,
        default: null,
    }
});

// Define some reactive variables;
const items = ref([]);
const variables = ref<CoreContactSelectFilteredListQueryVariables>({
    type: props.type,
    name: null,
});

// Define our GraphQL 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
query coreContactSelectFilteredList($name: String, $type: CoreContactTypes) {
    core {
      contact {
        list(name: $name, type: $type) {
          data {
            id
            name
          }
        }
      }
    }
  }`;

// Setup our Query
const { onResult, loading } = useCoreContactSelectFilteredListQuery(variables);
// and what we will do with the data
onResult((result) => {
    if(!result.data) return;
    items.value = result.data.core.contact.list.data;
});

// Functions
function search(event) {
    variables.value.name = "%" + event.query + "%";
}
</script>