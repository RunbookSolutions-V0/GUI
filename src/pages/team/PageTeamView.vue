<template>
  <div class="space-y-2" v-if="currentTeam">
    <PVCard>
      <template #title>{{ currentTeam.name }}</template>
      <template #content>
        {{ currentTeam.description }}
      </template>
    </PVCard>
    <PVCard>
      <template #title>Users</template>
      <template #content>
        <PVDataTable
          :value="currentTeam.users"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <PVColumn sortable field="id" header="ID"></PVColumn>
          <PVColumn field="photo" header="Photo"></PVColumn>
          <PVColumn sortable field="name" header="Name"></PVColumn>
          <PVColumn sortable field="pivot.role" header="Role"></PVColumn>
        </PVDataTable>
      </template>
    </PVCard>
    <PVCard>
      <template #title>Agents</template>
      <template #content>
        <PVDataTable
          :value="currentTeam.agents"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <PVColumn sortable field="id" header="ID"></PVColumn>
          <PVColumn sortable field="name" header="Name"></PVColumn>
        </PVDataTable>
      </template>
    </PVCard>
    <PVCard>
      <template #title>Invitations</template>
      <template #content>
        <PVDataTable
          :value="currentTeam.invitations"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <PVColumn sortable field="id" header="ID"></PVColumn>
          <PVColumn sortable field="accepted" header="Accepted"></PVColumn>
          <PVColumn sortable field="user.name" header="User"></PVColumn>
          <PVColumn sortable field="email" header="Email"></PVColumn>
          <PVColumn sortable field="inviter.name" header="Invited By"></PVColumn>
        </PVDataTable>
      </template>
    </PVCard>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
// PrimeVue
import PVCard from 'primevue/card'
import PVDataTable from 'primevue/datatable'
import PVColumn from 'primevue/column'

// Stores
import { useAuthStore } from '@/stores'

// GraphQL
import gql from 'graphql-tag'
import {
  type Team,
  useTeamViewCurrentQuery,
  type TeamViewCurrentQueryVariables
} from '@/graphql'

// Define our Store
const authStore = useAuthStore()

// Define reactive Variables
const variables = ref<TeamViewCurrentQueryVariables>({
  id: authStore.selectedTeam
})
const currentTeam = ref<Team>()

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query teamViewCurrent($id: ID) {
    team {
      single(id: $id) {
        id
        name
        personal
        description
        photo
        updated_at
        created_at
        agents {
          id
          name
        }
        invitations {
          id
          accepted
          email
          inviter {
            id
            name
            photo
          }
          user {
            id
            name
            photo
          }
        }
        users {
          id
          name
          pivot {
            role
          }
          photo
        }
      }
    }
  }
`
const { onResult, loading, error } = useTeamViewCurrentQuery(variables)
onResult((result) => {
  if (!result.data) return
  currentTeam.value = result.data.team.single as Team
})

watch(
  () => authStore.selectedTeam,
  () => {
    variables.value.id = authStore.selectedTeam
  }
)
</script>
