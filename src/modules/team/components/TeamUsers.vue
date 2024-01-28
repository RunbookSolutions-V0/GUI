<template>
    <PVCard>
        <template #title>Users</template>
        <template #content>
            <PVDataTable
                :value="props.users"
                v-model:editingRows="editingRows"
                @row-edit-save="onRowEditSave"
                editMode="row"
                dataKey="id"
                paginator
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]"
            >
            <!-- <PVColumn sortable field="id" header="ID"></PVColumn> -->
                <PVColumn field="photo" header="Photo">
                    <template #body="{ data }">
                        <PVAvatar
                            :label="
                                data.photo
                                    ? undefined
                                    : (data.name as string)
                                        .split(' ')
                                        .map((word) => word.charAt(0).toUpperCase())
                                        .join('')
                            "
                            :image="data.photo || undefined"
                        />
                    </template>
                </PVColumn>
                <PVColumn sortable field="name" header="Name"></PVColumn>
                <PVColumn sortable field="pivot.role" header="Role">
                    <template #editor="{ data }">
                        <PVDropdown 
                            v-model="data.pivot.role" 
                            :options="roles"
                        />
                    </template>
                </PVColumn>
                <PVColumn :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></PVColumn>
                <PVColumn :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
                    <template #body="slotProps">
                        <PVButton 
                            icon="pi pi-trash" 
                            severity="danger" 
                            areia-label="Remove From Team"
                            @click="RemoveTeamMember(slotProps.data.id, slotProps.index)"
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
import PVCard from 'primevue/card'
import PVDataTable, { type DataTableRowEditSaveEvent } from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVAvatar from 'primevue/avatar'
import PVButton from 'primevue/button'
import PVDropdown from 'primevue/dropdown';
import { useToast } from 'primevue/usetoast';



// GraphQL
import gql from 'graphql-tag'
import type { TeamUpdateInput, User } from '@/graphql'
import { useUpdateTeamUserRoleMutation, useRemoveUserFromTeamMutation } from "@/graphql"

// Stores
import { useAuthStore } from "@/stores"
const authStore = useAuthStore();

const toast = useToast();

const roles = [
    'owner', 'member'
]
const props = defineProps({
    users: {
        type: Object as () => User[],
        required: true,
    },
    teamId: {
        type: String,
        required: true
    }
})
const editingRows = ref([]);



// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
mutation updateTeamUserRole($input: TeamUpdateInput) {
  team {
    update(input: $input) {
      id
    }
  }
}
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
mutation removeUserFromTeam($teamID: ID!, $userID: ID!) {
    team {
        update(input: { id: $teamID, users: { disconnect: [$userID] } } ) {
            id
        }
    }
}
`;
const { mutate: updateRole, onDone: RoleUpdated } = useUpdateTeamUserRoleMutation();
RoleUpdated((result) => {
    if(!result.data) return;
    authStore.refreshUser();
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'User role Updated', life: 3000 });
})

const { mutate: removeUser, onDone: UserRemoved } = useRemoveUserFromTeamMutation();
UserRemoved((result) => {
    if(!result.data) return;
    authStore.refreshUser();
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'User Removed From Team', life: 3000 });
});

function onRowEditSave(event: DataTableRowEditSaveEvent) {
    const input = {
        id: props.teamId, 
        users: {
            syncWithoutDetaching: [
                {
                    id: event.data.id,
                    role: event.data.pivot.role
                }
            ]
        }
    } as TeamUpdateInput
    updateRole({ input: input })
}

function RemoveTeamMember(userID: String, index: number){
    removeUser({teamID: props.teamId, userID: userID as string})
    console.log(index);
}
</script>