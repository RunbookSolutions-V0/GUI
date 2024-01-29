<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="card">
    <PVDataTable
      v-model:editingRows="editingRows"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      :value="locations"
      :loading="loading"
      filterDisplay="row"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No Locations found. </template>
      <template #loading> Loading location data. Please wait. </template>
      <!-- <PVColumn field="id" header="ID">
        <template #body="slotProps">
          <RouterLink
            :to="{ 
              name: 'core.location.view', 
              params: { id: slotProps.data.id } 
            }"
          >
            {{ slotProps.data.id }}
          </RouterLink>
        </template>
      </PVColumn> -->
      <PVColumn field="name" header="Name" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
        <template #body="{ data }">
          <RouterLink
            :to="{
              name: 'core.location.view',
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
          <CoreLocationSelect v-model="data[field]" class="mb-2"></CoreLocationSelect>
        </template>
        <template #body="slotProps">
          <RouterLink
            v-if="slotProps.data.parent_id"
            :to="{
              name: 'core.location.view',
              params: {
                id: slotProps.data.parent_id
              }
            }"
          >
            {{
              slotProps.data.parent_location ? slotProps.data.parent_location.name : 'Changed...'
            }}
          </RouterLink>
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
      <PVColumn field="address" header="Address">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
      </PVColumn>
      <PVColumn
        :rowEditor="true"
        bodyStyle="text-align:center"
      ></PVColumn>
      <PVColumn :rowEditor="true">
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
  useCoreLocationDeleteMutation,
  useCoreLocationUpdateMutation,
  useCoreLocationListQuery,
  type CoreLocationQueriesListArgs,
  type CoreLocation,
  CoreLocationTypes
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
import Create from '@/modules/core/location/components/CoreLocationCreate.vue'
import GraphQLPaginator from '@/components/GraphQLPaginator.vue'
import CoreLocationSelect from '@/modules/core/location/components/CoreLocationSelect.vue'

// Dialog
const dialog = useDialog()

// Some Reactive Variables
const filter = ref<{
  name: string | null
  type: string | null
}>({
  name: null,
  type: null
})

const types = [
  { name: 'Building', value: CoreLocationTypes.BUILDING },
  { name: 'Other', value: CoreLocationTypes.OTHER },
  { name: 'Rack', value: CoreLocationTypes.RACK },
  { name: 'Room', value: CoreLocationTypes.ROOM }
]

const variables = ref<CoreLocationQueriesListArgs>({
  first: 10,
  page: 1,
  name: null,
  type: null
})
const locations = ref<CoreLocation[]>([])
const paginator = ref({})

const editingRows = ref([])

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
  query coreLocationList($first: Int, $page: Int, $name: String, $type: CoreLocationTypes) {
    core {
      location {
        list(first: $first, page: $page, name: $name, type: $type) {
          data {
            id
            name
            parent_id
            parent_location {
              id
              name
            }
            type
            description
            created_at
            address
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
  mutation coreLocationDelete($id: ID!) {
    core {
      location {
        delete(id: $id) {
          id
        }
      }
    }
  }
`

// Edit Rows
const { mutate, onDone } = useCoreLocationUpdateMutation()
onDone((result) => {
  if (!result.data) return
  console.info('Location Updated')
})

// Load our List
const { loading, onResult } = useCoreLocationListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const response = result.data.core.location.list
  locations.value = response.data as CoreLocation[]
  paginator.value = response.paginatorInfo
})

// Delete Rows
const { mutate: deleteRow, onDone: rowDeleted } = useCoreLocationDeleteMutation()
rowDeleted((result) => {
  if (!result.data || !result.data.core.location.delete) return
  console.info('Location Deleted')

  if (!result.data.core.location.delete.id) return
  const deletedID = result.data.core.location.delete.id

  locations.value.forEach((location, index) => {
    if (location.id === deletedID) locations.value.splice(index, 1)
  })
})

// Some Watchers
watch(
  filter,
  (v) => {
    // Name
    if (!v.name) variables.value.name = null
    else variables.value.name = '%' + v.name + '%'

    // Type
    if (!v.type) variables.value.type = null
    else variables.value.type = v.type as CoreLocationTypes
  },
  { deep: true }
)

// Functions
function showCreate() {
  dialog.open(Create, {
    props: {
      header: 'New Location',
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
      type: newData.type,
      description: newData.description,
      address: newData.address
    }
  })

  if (newData.parent_location && newData.parent_id != newData.parent_location.id) {
    newData.parent_location = null
  }

  locations.value[index] = newData
}
</script>
