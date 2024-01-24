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
        :suggestions="items"
        @complete="search"
        optionLabel="name"
        placeholder="Parent Location"
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
  useCoreLocationSelectFilteredListQuery,
  type CoreLocationSelectFilteredListQueryVariables,
  type CoreLocation,
  type InputMaybe
} from '@/graphql'

// Props
const props = defineProps({
  label: {
    type: [String || null],
    default: null
  }
})

// Define some reactive variables
// const value = ref("");
const items = ref<CoreLocation[]>([])
const variables = ref<CoreLocationSelectFilteredListQueryVariables>({
  name: null as InputMaybe<string>
})

// Define our GraphQL Document
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
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
</script>
