<template>
  <div class="card">
    <PVDataTable
      v-model:editingRows="editingRows"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      :value="devices"
      :loading="loading"
      filterDisplay="row"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No Devices found. </template>
      <template #loading> Loading device data. Please wait. </template>
      <!-- <PVColumn field="id" header="ID">
        <template #body="slotProps">
          <RouterLink :to="{ name: 'core.device.view', params: { id: slotProps.data.id } }">{{
            slotProps.data.id
          }}</RouterLink>
        </template>
      </PVColumn> -->

      <PVColumn field="name" header="Name" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
        <template #body="{ data }">
          <RouterLink :to="{ name: 'core.device.view', params: { id: data.id } }">
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

      <PVColumn field="hostname" header="Hostname" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
        <template #body="{ data }">
          {{ data.hostname }}
        </template>
        <template #filter="{}">
          <PVInputText
            v-model="filter.hostname"
            type="text"
            class="p-column-filter"
            placeholder="Search by hostname"
          />
        </template>
      </PVColumn>

      <PVColumn field="type" header="Type" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVDropdown
            v-model="data[field]"
            :options="types"
            optionLabel="name"
            optionValue="value"
            placeholder="Location Type"
            class="w-full mb-2"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value }}</div>
              </div>
              <div v-else class="flex items-center">
                <div>{{ slotProps.placeholder }}</div>
              </div>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </PVDropdown>
        </template>
        <template #filter="{}">
          <PVDropdown
            v-model="filter.type"
            :options="types"
            optionLabel="name"
            placeholder="Select a Type"
            class="w-full md:w-14rem"
            showClear
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
  useCoreDeviceDeleteMutation,
  useCoreDeviceUpdateMutation,
  useCoreDeviceListQuery,
  type CoreDeviceQueriesListArgs,
  type CoreDevice,
  CoreDeviceTypes
} from '@/graphql'

// PrimeVue
import PVButton from 'primevue/button'
import PVDataTable, { type DataTableRowEditSaveEvent } from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVInputText from 'primevue/inputtext'
import PVTextArea from 'primevue/textarea'
import PVDropdown from 'primevue/dropdown'
import { useDialog } from 'primevue/usedialog'

// Our Components
import GraphQLPaginator from '@/components/GraphQLPaginator.vue'
import Create from '@/components/core/device/CoreDeviceCreate.vue'

// Dialog
const dialog = useDialog()

// Define some reactive variables
const filter = ref<{
  name: string | null
  type: string | null
  hostname: string | null
}>({
  name: null,
  type: null,
  hostname: null
})

const types = [
  { name: 'Laptop', value: CoreDeviceTypes.LAPTOP },
  { name: 'Other', value: CoreDeviceTypes.OTHER },
  { name: 'Printer', value: CoreDeviceTypes.PRINTER },
  { name: 'Server', value: CoreDeviceTypes.SERVER },
  { name: 'Workstation', value: CoreDeviceTypes.WORKSTATION }
]

const variables = ref<CoreDeviceQueriesListArgs>({
  first: 10,
  page: 1,
  name: null,
  hostname: null,
  type: null
})
const devices = ref<CoreDevice[]>([])
const paginator = ref({})

const editingRows = ref([])

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
  query coreDeviceList(
    $first: Int
    $page: Int
    $name: String
    $hostname: String
    $type: CoreDeviceTypes
  ) {
    core {
      device {
        list(name: $name, hostname: $hostname, first: $first, page: $page, type: $type) {
          paginatorInfo {
            count
            currentPage
            firstItem
            hasMorePages
            lastItem
            lastPage
            perPage
            total
          }
          data {
            created_at
            description
            hostname
            id
            name
            type
            updated_at
          }
        }
      }
    }
  }
`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
  mutation coreDeviceDelete($id: ID!) {
    core {
      device {
        delete(id: $id) {
          id
        }
      }
    }
  }
`

// Edit Rows
const { mutate, onDone } = useCoreDeviceUpdateMutation()
onDone((result) => {
  if (!result.data) return
  console.info('Device Updated')
})

// Delete Rows
const { mutate: deleteRow, onDone: rowDeleted } = useCoreDeviceDeleteMutation()
rowDeleted((result) => {
  if (!result.data || !result.data.core.device.delete) return
  console.info('Device Deleted')

  if (!result.data.core.device.delete.id) return
  const deletedID = result.data.core.device.delete.id

  devices.value.forEach((device, index) => {
    if (device.id === deletedID) devices.value.splice(index, 1)
  })
})

// Load our List
const { loading, error, onResult } = useCoreDeviceListQuery(variables)
onResult((result) => {
  if (!result.data) return

  const response = result.data.core.device.list
  devices.value = response.data as CoreDevice[]
  paginator.value = response.paginatorInfo
})

// Some Watchers
watch(
  filter,
  (v) => {
    // Name
    if (!v.name) variables.value.name = null
    else variables.value.name = '%' + v.name + '%'

    // Hostname
    if (!v.hostname) variables.value.hostname = null
    else variables.value.hostname = '%' + v.hostname + '%'

    // Type
    if (!v.type) variables.value.type = null
    else variables.value.type = v.type as CoreDeviceTypes
  },
  { deep: true }
)

// Functions
function showCreate() {
  dialog.open(Create, {
    props: {
      header: 'New Device',
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
      hostname: newData.hostname,
      type: newData.type,
      description: newData.description
    }
  })

  devices.value[index] = newData
}
</script>
