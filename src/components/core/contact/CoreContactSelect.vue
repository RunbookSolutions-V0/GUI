<template>
  <div class="flex mb-2">
    <span class="relative flex-grow">
      <label
        v-if="props.label"
        :for="$attrs.inputId as string"
        class="text-sm text-primary-500 dark:text-primary-400/60 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {{ props.label }}
      </label>
      <AutoComplete
        v-bind="$attrs"
        :modelValue="value"
        @update:modelValue="updateSelectedContact"
        :suggestions="items"
        @complete="search"
        optionLabel="name"
        placeholder="Select a Contact"
        forceSelection
        dropdown
        dropdownMode="current"
        :loading="loading"
      />
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'
import gql from 'graphql-tag'

import {
  useCoreContactSelectFilteredSingleQuery,
  useCoreContactSelectFilteredListQuery,
  type CoreContactSelectFilteredListQueryVariables,
  type CoreContact,
  CoreContactTypes,
} from '@/graphql'

// Props
const props = defineProps({
  modelValue: {

  },
  label: {
    type: [String || null],
    default: null
  },
  type: {
    type: [String || null],
    default: null
  }
})

const $emits = defineEmits(['update:modelValue']);

// Define some reactive variables;
const value = ref<CoreContact>();
const items = ref<CoreContact[]>([])
const variables = ref<CoreContactSelectFilteredListQueryVariables>({
  type: props.type as CoreContactTypes,
  name: null
})

// Define our GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
query coreContactSelectFilteredSingle($id: ID!) {
    core {
      contact {
        single(id: $id) {
          id
          name
        }
      }
    }
  }
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
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
  }
`

// We were provided with a default value; we need to look it up.
if (props.modelValue != null) {
  console.log(props.modelValue)
  const { onResult: ValueLoaded } = useCoreContactSelectFilteredSingleQuery({id: props.modelValue});
  ValueLoaded((result) => {
    if(!result.data || !result.data.core.contact.single) return
    value.value = result.data.core.contact.single as CoreContact
  })
}

// Setup our Query
const { onResult, loading } = useCoreContactSelectFilteredListQuery(variables)
// and what we will do with the data
onResult((result) => {
  if (!result.data) return
  items.value = result.data.core.contact.list.data as CoreContact[]
})

// Functions
function search(event: AutoCompleteCompleteEvent) {
  variables.value.name = '%' + event.query + '%'
}

function updateSelectedContact(newSelection) {
  value.value = newSelection;
  if(typeof newSelection === 'string') return;

  $emits("update:modelValue", newSelection == null ? null : newSelection.id);
}
</script>
