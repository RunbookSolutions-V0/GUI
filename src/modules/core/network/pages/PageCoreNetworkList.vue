<template>
  <div class="card">
    <PVDataTable
      v-model:editingRows="editingRows"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      :value="networks"
      :loading="loading"
      filterDisplay="row"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No Networks found. </template>
      <template #loading> Loading network data. Please wait. </template>
      <!-- <PVColumn field="id" header="ID">
        <template #body="slotProps">
          <RouterLink :to="{ name: 'core.network.view', params: { id: slotProps.data.id } }">{{
            slotProps.data.id
          }}</RouterLink>
        </template>
      </PVColumn> -->
      <PVColumn field="name" header="Name" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
        <template #body="{ data }">
          <RouterLink
            :to="{
              name: 'core.network.view',
              params: { id: data.id }
            }"
          >
            {{ data.name }}
          </RouterLink>
        </template>
        <template #filter="{}">
          <PVInputText
            v-model="filter.name"
            type="text"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </PVColumn>
      <PVColumn field="parent_id" header="Parent ID">
        <template #editor="{ data, field }">
          <CoreNetworkSelect v-model="data[field]" class="mb-2"></CoreNetworkSelect>
        </template>
        <template #body="slotProps">
          <RouterLink
            v-if="slotProps.data.parent_id"
            :to="{
              name: 'core.network.view',
              params: {
                id: slotProps.data.parent_id
              }
            }"
          >
            {{
              slotProps.data.parent_network.name ? slotProps.data.parent_network.name : 'Changed...'
            }}
          </RouterLink>
        </template>
      </PVColumn>
      <PVColumn field="network" header="Network" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <IPInput v-model="data[field]" />
        </template>
        <template #body="{ data }">
          {{ data.network }}
        </template>
        <template #filter="{}">
          <PVInputText
            v-model="filter.network"
            type="text"
            class="p-column-filter"
            placeholder="Search by network"
          />
        </template>
      </PVColumn>
      <PVColumn field="description" header="Description">
        <template #editor="{ data, field }">
          <PVTextArea class="w-full" v-model="data[field]" />
        </template>
      </PVColumn>
      <PVColumn
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></PVColumn>
      <PVColumn :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
        <template #body="{ data }">
          <PVButton
            @click="deleteRow({ id: data.id })"
            icon="pi pi-trash"
            aria-label="Delete"
            severity="danger"
            rounded
            text
          />
        </template>
      </PVColumn>
    </PVDataTable>
  </div>

  <GraphQLPaginator :variables="variables" :paginator="paginator"></GraphQLPaginator>

  <PVButton icon="pi pi-plus" @click="showCreate" rounded raised text />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

// GraphQL
import gql from 'graphql-tag'
import {
  useCoreNetworkDeleteMutation,
  useCoreNetworkUpdateMutation,
  useCoreNetworkListQuery,
  type CoreNetworkQueriesListArgs,
  type CoreNetwork
} from '@/graphql'

// Prime Vue
import PVButton from 'primevue/button'
import PVDataTable, { type DataTableRowEditSaveEvent } from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVInputText from 'primevue/inputtext'
import PVTextArea from 'primevue/textarea'
import { useDialog } from 'primevue/usedialog'

// Our Compoents
import IPInput from '@/components/input/IPInput.vue'
import Create from '@/modules/core/network/components/CoreNetworkCreate.vue'
import GraphQLPaginator from '@/components/GraphQLPaginator.vue'
import CoreNetworkSelect from '@/modules/core/network/components/CoreNetworkSelect.vue'

// Dialog
const dialog = useDialog()

// Define our Reactive Variables
const filter = ref({
  name: null,
  network: null
})

const variables = ref<CoreNetworkQueriesListArgs>({
  first: 10,
  page: 1,
  name: null,
  network: null
})
const networks = ref<CoreNetwork[]>([])
const paginator = ref({})

const editingRows = ref([])

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
  query coreNetworkList($perPage: Int, $page: Int, $name: String, $network: String) {
    core {
      network {
        list(first: $perPage, page: $page, name: $name, network: $network) {
          data {
            id
            name
            parent_id
            description
            created_at
            network
            mask
            updated_at
            parent_network {
              id
              name
            }
          }
          paginatorInfo {
            firstItem
            lastItem
            count
            currentPage
            hasMorePages
            lastPage
            perPage
            total
          }
        }
      }
    }
  }
`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
  mutation coreNetworkDelete($id: ID!) {
    core {
      network {
        delete(id: $id) {
          id
        }
      }
    }
  }
`
// Edit Rows
const { mutate, onDone } = useCoreNetworkUpdateMutation()
onDone((result) => {
  if (!result.data) return
  console.info('Network Updated')
})

// Delete Rows
const { mutate: deleteRow, onDone: rowDeleted } = useCoreNetworkDeleteMutation()
rowDeleted((result) => {
  if (!result.data || !result.data.core.network.delete) return
  console.info('Network Deleted')

  if (!result.data.core.network.delete.id) return
  const deletedID = result.data.core.network.delete.id

  networks.value.forEach((network, index) => {
    if (network.id === deletedID) networks.value.splice(index, 1)
  })
})

// Load our List
const { loading, error, onResult } = useCoreNetworkListQuery(variables)
onResult((result) => {
  if (!result.data) return

  const response = result.data.core.network.list
  networks.value = response.data as CoreNetwork[]
  paginator.value = response.paginatorInfo
})

// Some Watchers
watch(
  filter,
  (v) => {
    // Name
    if (!v.name) variables.value.name = null
    else variables.value.name = '%' + v.name + '%'

    // Network
    if (!v.network) variables.value.network = null
    else variables.value.network = '%' + v.network + '%'
  },
  { deep: true }
)

// Functions
function showCreate() {
  dialog.open(Create, {
    props: {
      header: 'New Network',
      modal: true
    }
  })
}

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  let { newData, index } = event

  mutate({
    input: {
      id: newData.id,
      name: newData.name,
      parent_id: newData.parent_id,
      network: newData.netowkr,
      description: newData.description
    }
  })

  if (newData.parent_network && newData.parent_id != newData.parent_network.id) {
    newData.parent_network = null
  }

  networks.value[index] = newData
}
</script>
