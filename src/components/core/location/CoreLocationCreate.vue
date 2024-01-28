<template>
  <div clas="mx-4 space-y-4">
    <InputTextLabel v-model="formData.name" label="Name"></InputTextLabel>
    <Dropdown
      v-model="selectedLocationType"
      :options="locationTypes"
      optionLabel="name"
      placeholder="Location Type"
      class="w-full md:w-full mb-2"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
          <div>{{ slotProps.value.name }}</div>
        </div>
        <div v-else class="flex items-center">
          <div>{{ slotProps.placeholder }}</div>
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
    <CoreLocationSelect
      v-model="formData.parent_id"
      label="Parent Location"
      class="mb-2"
    ></CoreLocationSelect>
    <TextAreaLabel v-model="formData.description" label="Description"></TextAreaLabel>
  </div>
  <VPButton label="Create Location" @click="createLocation" />
</template>
<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'
import router from '@/router'

// PrimeVue
import VPButton from 'primevue/button'
import Dropdown from 'primevue/dropdown'

// Our Components
import InputTextLabel from '@/components/Input/InputTextLabel.vue'
import TextAreaLabel from '@/components/Input/TextAreaLabel.vue'
import CoreLocationSelect from '@/components/core/location/CoreLocationSelect.vue'

import gql from 'graphql-tag'
import {
  type CoreLocationCreateInput,
  CoreLocationTypes,
  useCoreLocationCreateMutation
} from '@/graphql'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

// Valid Location types
const locationTypes = [
  { name: 'Building', value: CoreLocationTypes.BUILDING },
  { name: 'Other', value: CoreLocationTypes.OTHER },
  { name: 'Rack', value: CoreLocationTypes.RACK },
  { name: 'Room', value: CoreLocationTypes.ROOM }
]
// Form Data to Submit to Create Location
const formData = ref<CoreLocationCreateInput>({
  name: '',
  description: null,
  type: CoreLocationTypes.OTHER,
  parent_id: null,
  address: null
})
// The Selected Location Type
const selectedLocationType = ref<{ name: string; value: string }>()

// Submission Mutation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation coreLocationCreate($input: CoreLocationCreateInput) {
    core {
      location {
        create(input: $input) {
          id
        }
      }
    }
  }
`
const { mutate: locationMutation, onDone } = useCoreLocationCreateMutation()
function createLocation() {
  if (!selectedLocationType.value) return
  formData.value.type = selectedLocationType.value.value as CoreLocationTypes

  locationMutation({ input: formData.value })
}
onDone((result) => {
  if (!result.data) return
  const response = result.data.core.location.create

  router.push({ name: 'core.location.view', params: { id: response.id } })
  if (!dialogRef) return
  dialogRef.value.close()
})
</script>
