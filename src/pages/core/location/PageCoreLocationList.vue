<template>
  <div class="card">
    <PVDataTable
      :value="locations"
      :loading="loading"
      filterDisplay="row"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No Locations found. </template>
      <template #loading> Loading location data. Please wait. </template>
      <PVColumn field="id" header="ID">
        <template #body="slotProps">
          <RouterLink :to="{ name: 'core.location.view', params: { id: slotProps.data.id } }">{{
            slotProps.data.id
          }}</RouterLink>
        </template>
      </PVColumn>
      <PVColumn field="name" header="Name" :showFilterMenu="false">
        <template #body="{ data }">
          {{ data.name }}
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
            {{ slotProps.data.parent_location.name }}
          </RouterLink>
        </template>
      </PVColumn>
      <PVColumn field="type" header="Type" :showFilterMenu="false">
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
      <PVColumn field="description" header="Description"></PVColumn>
      <PVColumn field="address" header="Address"></PVColumn>
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
  useCoreLocationListQuery,
  type CoreLocationQueriesListArgs,
  type CoreLocation,
  CoreLocationTypes
} from '@/graphql'

// PrimeVue
import PVButton from 'primevue/button'
import PVDataTable from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVInputText from 'primevue/inputtext'
import PVDropdown from 'primevue/dropdown'
import { useDialog } from 'primevue/usedialog'

// Our Components
import Create from '@/components/core/location/CoreLocationCreate.vue'
import GraphQLPaginator from '@/components/GraphQLPaginator.vue'

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

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
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
const { loading, error, onResult } = useCoreLocationListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const response = result.data.core.location.list
  locations.value = response.data as CoreLocation[]
  paginator.value = response.paginatorInfo
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
    else variables.value.type = v.type.value
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
</script>
