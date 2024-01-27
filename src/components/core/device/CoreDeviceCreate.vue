<template>
  <div clas="mx-4 space-y-4">
    <InputTextLabel v-model="form.name" label="Name"></InputTextLabel>
    <VPDropdown
      v-model="selectedType"
      :options="types"
      optionLabel="name"
      placeholder="Device Type"
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
    </VPDropdown>
    <InputTextLabel v-model="form.hostname" label="Hostname"></InputTextLabel>
    <TextAreaLabel v-model="form.description" label="Description"></TextAreaLabel>
  </div>
  <VPButton label="Create Device" @click="createDevice" />
</template>
<script setup lang="ts">
import { ref, inject } from 'vue'
import router from '@/router'

// GraphQL
import gql from 'graphql-tag'
import { type CoreDeviceCreateInput, CoreDeviceTypes } from '@/graphql'
import { useCoreDeviceCreateMutation } from '@/graphql'

// Prime Vue
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import VPButton from 'primevue/button'
import VPDropdown from 'primevue/dropdown'

// Our Components
import InputTextLabel from '@/components/Input/InputTextLabel.vue'
import TextAreaLabel from '@/components/Input/TextAreaLabel.vue'

// Injections
const dialogRef = inject('dialogRef')

// Define some reactive variables
const form = ref<CoreDeviceCreateInput>({
  name: '',
  type: CoreDeviceTypes.OTHER,
  hostname: null,
  description: null
})

const selectedType = ref<{ name: string; value: string }>()

const types = [
  { name: 'Laptop', value: CoreDeviceTypes.LAPTOP },
  { name: 'Other', value: CoreDeviceTypes.OTHER },
  { name: 'Printer', value: CoreDeviceTypes.PRINTER },
  { name: 'Server', value: CoreDeviceTypes.SERVER },
  { name: 'Workstation', value: CoreDeviceTypes.WORKSTATION }
]

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation coreDeviceCreate($input: CoreDeviceCreateInput!) {
    core {
      device {
        create(input: $input) {
          id
        }
      }
    }
  }
`
const { mutate: createMutation, onDone } = useCoreDeviceCreateMutation()
onDone((result) => {
  if (!result.data) return
  router.push({
    name: 'core.device.view',
    params: {
      id: result.data.core.device.create.id
    }
  })
  form.value = {
    name: '',
    type: CoreDeviceTypes.OTHER,
    hostname: null,
    description: null
  }

  dialogRef.value.close()
})

// Our Functions
function createDevice() {
  if (!selectedType.value) return

  form.value.type = selectedType.value.value as CoreDeviceTypes

  createMutation({ input: form.value })
}
</script>
