<template>
  <h1>Create Team</h1>
  <InputTextLabel v-model="form.name" label="Team Name" />
  <TextAreaLabel v-model="form.description" label="Team Description" />
  <FileUpload v-model="photo" :multiple="false"></FileUpload>
  <PVButton label="Create Team" @click="createTeam" />
</template>
<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'

// PrimeVue
import PVButton from 'primevue/button'
import { useToast } from 'primevue/usetoast'

// Stores
import { useAuthStore } from '@/stores'

// GraphQL
import gql from 'graphql-tag'
import { useTeamCreateMutation, type TeamCreateInput } from '@/graphql'

// Our Components
import InputTextLabel from '@/components/Input/InputTextLabel.vue'
import TextAreaLabel from '@/components/Input/TextAreaLabel.vue'
import FileUpload, { type FileUploadReturn } from '@/components/Input/FileUpload.vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

// Stores
const authStore = useAuthStore()

const photo = ref<FileUploadReturn>({
  file: undefined,
  vapor: null,
  progress: 0
})

const form = ref<TeamCreateInput>({
  name: '',
  description: null,
  file: null
})

// Our Injections
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const toast = useToast()

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation teamCreate($input: TeamCreateInput) {
    team {
      create(input: $input) {
        id
      }
    }
  }
`
const { mutate, onDone } = useTeamCreateMutation()
onDone((result) => {
  if (!result.data || !result.data.team.create) return

  form.value.name = ''
  form.value.description = null
  form.value.file = null

  authStore.refreshUser()
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Team Created!',
    life: 3000
  })

  if (!dialogRef) return
  dialogRef.value.close()
})

// Functions
function createTeam() {
  mutate({
    input: {
      ...form.value,
      file: photo.value.vapor
    }
  })
}
</script>
