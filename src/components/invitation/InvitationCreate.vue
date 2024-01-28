<template>
  <PVTabView>
    <PVTabPanel header="By Eamil">
      <InputTextLabel v-model="email" label="Email"></InputTextLabel>
      <PVButton @click="sendEmailInvitation" label="Send Invitation" />
    </PVTabPanel>
    <PVTabPanel header="From Another Team">
      <UserSelect v-model="user" label="Select user from another team"></UserSelect>
      <PVButton @click="sendUserInvitaiton" label="Send Invitation" />
    </PVTabPanel>
  </PVTabView>
</template>
<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'

// PrimeVue
import PVTabView from 'primevue/tabview'
import PVTabPanel from 'primevue/tabpanel'
import PVButton from 'primevue/button'
import { useToast } from 'primevue/usetoast'

// GraphQL
import { useInvitationCreateMutation, type User } from '@/graphql'
import gql from 'graphql-tag'

// Our Components
import InputTextLabel from '@/components/Input/InputTextLabel.vue'
import UserSelect from '@/components/user/UserSelect.vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

// Define reactive variables
const email = ref('')
const user = ref<User>()

// Our Injections
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const toast = useToast()

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation invitationCreate($input: InvitationCreateInput) {
    invitation {
      create(input: $input) {
        id
      }
    }
  }
`

const { mutate, onDone } = useInvitationCreateMutation()
onDone((result) => {
  if (!result.data) return

  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Invitation Sent',
    life: 3000
  })

  if (!dialogRef) return
  dialogRef.value.close()
})

// Functions

function sendEmailInvitation() {
  if (!email.value || email.value == '') return
  mutate({ input: { email: email.value } })
}

function sendUserInvitaiton() {
  if (!user.value || !user.value.email) return
  mutate({ input: { email: user.value.email } })
}
</script>
