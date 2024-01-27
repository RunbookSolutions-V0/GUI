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
        @update:modelValue="updateSelectedNetwork"
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
  useCoreNetworkSelectFilteredSingleQuery,
  useCoreNetworkSelectFilteredListQuery,
  type CoreNetworkSelectFilteredListQueryVariables,
  type CoreNetwork,
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
const value = ref<CoreNetwork>()
const items = ref<CoreNetwork[]>([])
const variables = ref<CoreNetworkSelectFilteredListQueryVariables>({
  name: null as InputMaybe<string>
})

// Define our GraphQL Document
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
  query coreNetworkSelectFilteredSingle($id: ID!) {
    core {
      network {
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

// We were provided with a default value; we need to look it up.
if (props.modelValue != null) {
  const { onResult: ValueLoaded } = useCoreNetworkSelectFilteredSingleQuery({
    id: props.modelValue
  })
  ValueLoaded((result) => {
    if (!result.data || !result.data.core.network.single) return
    value.value = result.data.core.network.single as CoreNetwork
  })
}

// Setup our Query
const { onResult, loading } = useCoreNetworkSelectFilteredListQuery(variables)
onResult((result) => {
  if (!result.data) return
  items.value = result.data.core.network.list.data as CoreNetwork[]
  console.log('OK')
})

function search(event: AutoCompleteCompleteEvent) {
  variables.value.name = '%' + event.query + '%'
}

function updateSelectedNetwork(newSelection) {
  value.value = newSelection
  if (typeof newSelection === 'string') return

  $emits('update:modelValue', newSelection == null ? null : newSelection.id)
}
</script>
