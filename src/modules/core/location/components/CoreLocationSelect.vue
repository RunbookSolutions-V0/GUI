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
        @update:modelValue="updateSelectedLocation"
        :suggestions="items"
        @complete="search"
        optionLabel="name"
        placeholder="Select a Location"
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
  useCoreLocationSelectFilteredSingleQuery,
  useCoreLocationSelectFilteredListQuery,
  type CoreLocationSelectFilteredListQueryVariables,
  type CoreLocation,
  type InputMaybe
} from '@/graphql'

// Props
const props = defineProps({
  modelValue: {},
  label: {
    type: [String || null],
    default: null
  }
})

const $emits = defineEmits(['update:modelValue'])

// Define some reactive variables
const value = ref<CoreLocation>()
const items = ref<CoreLocation[]>([])
const variables = ref<CoreLocationSelectFilteredListQueryVariables>({
  name: null as InputMaybe<string>
})

// Define our GraphQL Document
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
  query coreLocationSelectFilteredSingle($id: ID!) {
    core {
      location {
        single(id: $id) {
          id
          name
        }
      }
    }
  }
`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
  query coreLocationSelectFilteredList($name: String) {
    core {
      location {
        list(name: $name) {
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
  const { onResult: ValueLoaded } = useCoreLocationSelectFilteredSingleQuery({
    id: props.modelValue as string
  })
  ValueLoaded((result) => {
    if (!result.data || !result.data.core.location.single) return
    value.value = result.data.core.location.single as CoreLocation
  })
}

// Setup our Query
const { onResult, loading } = useCoreLocationSelectFilteredListQuery(variables)
// and what we will do with the data
onResult((result) => {
  if (!result.data) return
  items.value = result.data.core.location.list.data as CoreLocation[]
})

function search(event: AutoCompleteCompleteEvent) {
  variables.value.name = '%' + event.query + '%'
}

function updateSelectedLocation(newSelection: CoreLocation) {
  value.value = newSelection
  if (typeof newSelection === 'string') return

  $emits('update:modelValue', newSelection == null ? null : newSelection.id)
}
</script>
