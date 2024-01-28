<template>
  <div class="flex mb-2">
    <span class="relative flex-grow">
      <label
        v-if="props.label"
        :for="$attrs.inputId as string | undefined"
        class="text-sm text-primary-500 dark:text-primary-400/60 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {{ props.label }}
      </label>
      <PVAutoComplete
        v-bind="$attrs"
        :suggestions="items"
        @complete="search"
        optionLabel="name"
        placeholder="Select User"
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
// PrimeVue
import PVAutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'

// GraphQL
import gql from 'graphql-tag'
import {
  useUserSelectFilteredListQuery,
  type User,
  type UserSelectFilteredListQueryVariables
} from '@/graphql'

// Define our Props
// Props
const props = defineProps({
  label: {
    type: [String || null],
    default: null
  }
})

// Define some Reactive Variables
const items = ref<User[]>([])
const variables = ref<UserSelectFilteredListQueryVariables>({
  email: null,
  name: null
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query UserSelectFilteredList($email: String, $name: String) {
    user {
      list(email: $email, name: $name) {
        data {
          id
          email
          name
          photo
        }
      }
    }
  }
`
// Setup our Query
const { onResult, loading } = useUserSelectFilteredListQuery(variables)
// and what we will do with the data
onResult((result) => {
  if (!result.data) return
  items.value = result.data.user.list.data as User[]
})

// Functions
function search(event: AutoCompleteCompleteEvent) {
  variables.value.name = '%' + event.query + '%'
}
</script>
