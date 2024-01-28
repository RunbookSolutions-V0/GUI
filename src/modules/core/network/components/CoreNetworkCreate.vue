<template>
  <div clas="mx-4 space-y-4">
    <InputTextLabel v-model="formData.name" label="Name"></InputTextLabel>
    <CoreNetworkSelect
      v-model="formData.parent_id"
      label="Parent Network"
      class="mb-2"
    ></CoreNetworkSelect>
    <IPInput v-model="formData.network" />
    <TextAreaLabel v-model="formData.description" label="Description"></TextAreaLabel>
  </div>
  <VPButton label="Create Network" @click="createNetwork" />
</template>
<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'
import router from '@/router'
import gql from 'graphql-tag'

import VPButton from 'primevue/button'
import InputTextLabel from '@/components/input/InputTextLabel.vue'
import TextAreaLabel from '@/components/input/TextAreaLabel.vue'

import CoreNetworkSelect from '@/modules/core/network/components/CoreNetworkSelect.vue'

import IPInput from '@/components/input/IPInput.vue'

import { type CoreNetworkCreateInput, useCoreNetworkCreateMutation } from '@/graphql'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

// Form Data to Submit to Create Network
const formData = ref<CoreNetworkCreateInput>({
  name: '',
  network: '192.168.1.1/32',
  parent_id: null,
  description: null
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation coreNetworkCreate($input: CoreNetworkCreateInput) {
    core {
      network {
        create(input: $input) {
          id
        }
      }
    }
  }
`

// Submission Mutation
const { mutate: networkMutation, onDone } = useCoreNetworkCreateMutation()
function createNetwork() {
  networkMutation({ input: formData.value })
}
onDone((result) => {
  if (!result.data) return
  const response = result.data.core.network.create

  router.push({ name: 'core.network.view', params: { id: response.id } })
  if (!dialogRef) return
  dialogRef.value.close()
})
</script>
