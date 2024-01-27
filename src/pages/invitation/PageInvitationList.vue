<template>
  <PVCard>
    <template #title>Invitations</template>
    <template #content>
      <PVDataTable :value="invitations" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <PVColumn sortable field="id" header="ID"></PVColumn>
        <PVColumn sortable field="team.name" header="Team"></PVColumn>
        <PVColumn sortable field="inviter.name" header="Invited By"></PVColumn>
      </PVDataTable>
    </template>
  </PVCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// PrimeVue
import PVDataTable from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVCard from 'primevue/card'

// GraphQL
import gql from 'graphql-tag'
import { type Invitation, useInvitationListQuery } from '@/graphql'

// Define reactive variables
const invitations = ref<Invitation[]>()

// GraphQL
const GraphQLDocument = gql`
  query invitationList {
    user {
      me {
        invitations {
          id
          inviter {
            id
            email
            name
            photo
          }
          team {
            id
            name
            photo
            personal
            description
          }
        }
      }
    }
  }
`
const { onResult, error, loading } = useInvitationListQuery()
onResult((result) => {
  if (!result.data) return
  invitations.value = result.data.user.me.invitations as Invitation[]
})
</script>
