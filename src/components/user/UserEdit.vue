<template>
  <h2>Edit User</h2>
  <FileUpload v-model="photo" :multiple="false"></FileUpload>
  <PVButton @click="saveChanges" label="Update Profile" />
</template>
<script setup lang="ts">
import { ref, inject } from 'vue'

// PrimeVue
import PVButton from 'primevue/button'
import { useToast } from 'primevue/usetoast'

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
import FileUpload from '@/components/Input/FileUpload.vue'

// Stores
const authStore = useAuthStore()

// Our Injections
const dialog = inject('dialogRef')
const toast = useToast()

// Reactive Variables
const photo = ref({})
const form = ref<UserUpdateInput>({
  name: authStore.user.name
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
  console.log('Updated!')
  if (!result.data || !result.data.user.update) return

  form.value.name = null
  photo.value = {}

  authStore.refreshUser()
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Profile Saved!',
    life: 3000
  })

  if (!dialog.value) return
  dialog.value.close()
})

// Functions
function saveChanges() {
  while (photo.value.progress < 100) {
    console.log(photo.value.progress)
  }
  mutate({
    input: {
      id: authStore.user.id,
      name: form.value.naem,
      file: photo.value.vapor
    }
  })
}
</script>
