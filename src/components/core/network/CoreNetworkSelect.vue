<template>
  <div class="flex mb-2">
    <span class="relative flex-grow">
      <label
        v-if="$attrs.label"
        :for="$attrs.inputId"
        class="text-sm text-primary-500 dark:text-primary-400/60 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {{ $attrs.label }}
      </label>
      <AutoComplete
        v-bind="$attrs"
        :suggestions="items"
        @complete="search"
        optionLabel="name"
        placeholder="Select a Network"
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
  useCoreNetworkSelectFilteredListQuery,
  type CoreNetworkSelectFilteredListQueryVariables,
  type CoreNetwork,
  type InputMaybe
} from '@/graphql'

const items = ref<CoreNetwork[]>([])
const variables = ref<CoreNetworkSelectFilteredListQueryVariables>({
  name: null as InputMaybe<string>
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query coreNetworkSelectFilteredList($name: String) {
    core {
      network {
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

const { onResult, loading } = useCoreNetworkSelectFilteredListQuery(variables)
onResult((result) => {
  if (!result.data) return
  items.value = result.data.core.network.list.data as CoreNetwork[]
  console.log('OK')
})

function search(event: AutoCompleteCompleteEvent) {
  variables.value.name = '%' + event.query + '%'
}
</script>
