<template>
  <h2>Edit User</h2>
  <FileUpload v-model="photo" :multiple="false"></FileUpload>
  <PVButton @click="saveChanges" label="Update Profile" />
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, inject } from 'vue'

// PrimeVue
import PVButton from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

// Stores
import { useAuthStore } from '@/stores'

// GraphQL
import gql from 'graphql-tag'
import {
  useEditProfileMutation,
  type EditProfileMutationVariables,
  type UserUpdateInput
} from '@/graphql'

// Our Components
import FileUpload, { type FileUploadReturn } from '@/components/Input/FileUpload.vue'

// Stores
const authStore = useAuthStore()

// Our Injections
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const toast = useToast()

// Reactive Variables
const photo = ref<FileUploadReturn>({
  file: undefined,
  vapor: null,
  progress: 0
})
const form = ref<UserUpdateInput>({
  name: authStore.user?.name,
  id: ''
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation editProfile($input: UserUpdateInput) {
    user {
      update(input: $input) {
        id
      }
    }
  }
`
const { mutate, onDone } = useEditProfileMutation()
onDone((result) => {
  if (!result.data || !result.data.user.update) return

  form.value.name = null
  photo.value = {} as FileUploadReturn

  authStore.refreshUser()
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Profile Saved!',
    life: 3000
  })

  if (!dialogRef) return
  dialogRef.value.close()
})

// Functions
function saveChanges() {
  while (photo.value.progress < 100) {
    // No Op
    // Wait for Photo to be uploaded
  }
  if (!authStore.user) return
  mutate({
    input: {
      id: authStore.user.id,
      name: form.value.name,
      file: photo.value.vapor
    }
  })
}
</script>
