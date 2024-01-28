<template>
  <div class="space-y-2" v-if="currentTeam">
    <!-- Team Info -->
    <PVCard>
      <template #title>{{ currentTeam.name }}</template>
      <template #content>
        <PVButton label="Delete Team" @click="deleteTeam({id: currentTeam.id})" />
        {{ currentTeam.description }}
      </template>
    </PVCard>

    <!-- Team Users -->
    <TeamUsers :teamId="currentTeam.id" :users="currentTeam.users"></TeamUsers>

    <!-- Team Agents -->
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
    <!-- Team Invitations -->
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
import PVButton from 'primevue/button'

// Stores
import { useAuthStore } from '@/stores'

// GraphQL
import gql from 'graphql-tag'
import { 
  useDeleteTeamMutation,
  useTeamViewCurrentQuery, 
  type Team,
  type TeamViewCurrentQueryVariables 
} from '@/graphql'

// Out Components
import TeamUsers from '@/modules/team/components/TeamUsers.vue'
import router from '@/router'

// Define our Store
const authStore = useAuthStore()

// Define reactive Variables
const variables = ref<TeamViewCurrentQueryVariables>({
  id: authStore.selectedTeam
})
const currentTeam = ref<Team>()

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
mutation deleteTeam($id: ID!) {
  team {
    delete(id: $id) {
      id
    }
  }
}
`;

// Load the Team Information
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

// Delete the Team
const { mutate: deleteTeam, onDone } = useDeleteTeamMutation();
onDone((result) => {
  if(!result.data) return;
  authStore.selectedTeam = authStore.user?.personal_team.id || null;
  authStore.refreshUser()
  console.log("Team Deleted.");
  router.push({name: 'dashboard'});
})

</script>
