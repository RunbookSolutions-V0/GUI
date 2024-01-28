<template>
  {{ invitations?.length }}
  <PVCard>
    <template #title>Invitations</template>
    <template #content>
      <PVDataTable :value="invitations" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <!-- <PVColumn sortable field="id" header="ID"></PVColumn> -->
        <PVColumn sortable field="team.name" header="Team"></PVColumn>
        <PVColumn sortable field="accepted" header="Accepted">
          <template #body="{ data }">
            {{ data.accepted ? 'true' : 'False' }}
          </template>
        </PVColumn>
        <PVColumn sortable field="inviter.name" header="Invited By"></PVColumn>
        <PVColumn :rowEditor="true" header="Actions">
          <template #body="slotProps">
            <PVButton
              @click="respondToInvitation(slotProps.data.id, true, slotProps.index)"
              icon="pi pi-check"
              aria-label="Accept"
              severity="success"
              rounded
              text
            />
            <PVButton
              @click="respondToInvitation(slotProps.data.id, false, slotProps.index)"
              icon="pi pi-times"
              aria-label="Decline"
              severity="danger"
              rounded
              text
            />
          </template>
        </PVColumn>
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
import PVButton from 'primevue/button'

// GraphQL
import gql from 'graphql-tag'
import {
  useDeleteInvitationMutation,
  useRespondToInvitationMutation,
  useInvitationListQuery,
  type Invitation
} from '@/graphql'

// Stores
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()

// Define reactive variables
const invitations = ref<Invitation[]>()

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
mutation respondToInvitation($accepted: Boolean!, $id: ID!) {
  invitation {
    update(input: {id: $id, accepted: $accepted}) {
      id
      accepted
    }
  }
}
`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument3 = gql`
mutation deleteInvitation($id: ID!) {
  invitation {
    delete(id: $id) {
      id
      accepted
    }
  }
}
`
const { onResult, error, loading } = useInvitationListQuery()
onResult((result) => {
  if (!result.data) return
  invitations.value = result.data.user.me.invitations as Invitation[]
})

const { 
  mutate: acceptInvitation, 
  onDone: invitationAccepted 
} = useRespondToInvitationMutation();

invitationAccepted((result) => {
  if(!result.data) return;
})

const {
  mutate: rejectInvitation,
  onDone: invitationRejected
} = useDeleteInvitationMutation();
invitationRejected((result) => {
  if(!result.data) return;
  
})

// Functions
function respondToInvitation(id: string, accepted: boolean, index: number) {
  if(accepted)
    acceptInvitation({id: id, accepted: true});
  else
    rejectInvitation({id: id})

  authStore.refreshUser();
  invitations.value?.splice(index,1);
}
</script>
