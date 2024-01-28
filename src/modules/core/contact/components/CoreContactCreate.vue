<template>
  <div clas="mx-4 space-y-4">
    <InputTextLabel v-model="form.name" label="Name"></InputTextLabel>
    <FileUpload v-model="photo" :multiple="false"></FileUpload>
    <VPDropdown
      v-model="selectedType"
      :options="types"
      optionLabel="name"
      placeholder="Contact Type"
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

    <CoreContactSelect
      v-if="selectedType?.value == CoreContactTypes.PERSON"
      v-model="selectedCompany"
      label="Company"
      type="COMPANY"
    />

    <InputTextLabel v-model="form.email" label="Email"></InputTextLabel>
    <InputTextLabel v-model="form.phone" label="Phone"></InputTextLabel>

    <TextAreaLabel v-model="form.description" label="Description"></TextAreaLabel>
  </div>
  <VPButton label="Create Contact" @click="createContact" />
</template>
<script setup lang="ts">
import { ref, inject, watch, type Ref } from 'vue'
import router from '@/router'

// GraphQL
import gql from 'graphql-tag'
import { type CoreContactCreateInput, CoreContactTypes } from '@/graphql'
import { useCoreContactCreateMutation } from '@/graphql'

// Prime Vue
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import VPButton from 'primevue/button'
import VPDropdown from 'primevue/dropdown'

// Our Components
import InputTextLabel from '@/components/input/InputTextLabel.vue'
import TextAreaLabel from '@/components/input/TextAreaLabel.vue'
import CoreContactSelect from '@/modules/core/contact/components/CoreContactSelect.vue'
import FileUpload, { type FileUploadReturn } from '@/components/input/FileUpload.vue'

// Injections
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

// Props

// Define our Reactive Props
const photo = ref<FileUploadReturn>({
  file: undefined,
  vapor: null,
  progress: 0
})
const form = ref<CoreContactCreateInput>({
  name: '',
  type: CoreContactTypes.PERSON,
  description: null
})
const selectedType = ref<{ name: string; value: string }>()
const selectedCompany = ref<{ name: string; id: string }>()

const types = [
  { name: 'Person', value: CoreContactTypes.PERSON },
  { name: 'Company', value: CoreContactTypes.COMPANY }
]

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation coreContactCreate($input: CoreContactCreateInput!) {
    core {
      contact {
        create(input: $input) {
          id
        }
      }
    }
  }
`
const { mutate: createMutation, onDone } = useCoreContactCreateMutation()
onDone((result) => {
  if (!result.data) return
  router.push({
    name: 'core.contact.view',
    params: {
      id: result.data.core.contact.create.id
    }
  })
  if (!dialogRef) return
  dialogRef.value.close()
})

// Functions
function createContact() {
  if (!selectedType.value) return
  const input = {
    ...form.value,
    company_id: selectedCompany.value?.id,
    type: selectedType.value.value,
    file: photo.value.vapor
  } as CoreContactCreateInput
  createMutation({ input: input })
}
</script>
