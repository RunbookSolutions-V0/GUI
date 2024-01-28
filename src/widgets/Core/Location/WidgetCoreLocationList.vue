<template>
  <WidgetInterface v-bind="$props">
    <PVCard
      class="h-full w-full overflow-auto"
      :pt-options="{ mergeProps: false, mergeSections: true }"
      :pt="{
        body: 'py-5 h-full flex flex-col',
        content: 'px-5 md:px-6'
      }"
    >
      <template #title>
        <div class="flex">
          <div class="flex-grow">Locations</div>
          <PVButton
            label="Attach Locations"
            @click="
              () => {
                showAttachDialog = true
              }
            "
          />
        </div>
      </template>
      <template #content>
        <template v-if="loading"> Loading... </template>
        <template v-else>
          <div class="w-full">
            <PVDataTable :value="displayLocations">
              <PVColumn field="name" header="Name"></PVColumn>
              <PVColumn field="description" header="Description"></PVColumn>
              <PVColumn field="location" header="Location"></PVColumn>
            </PVDataTable>
          </div>
          <div class="flex flex-grow"></div>
        </template>
      </template>
    </PVCard>
    <PVDialog
      v-model:visible="showAttachDialog"
      header="Attach Locations"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <LocationSelect v-model="locationsToAttach" multiple></LocationSelect>
        <PVButton label="Attach Locations" @click="attachLocations"></PVButton>
      </div>
    </PVDialog>
  </WidgetInterface>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// PrimeVue
import PVButton from 'primevue/button'
import PVDataTable from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVCard from 'primevue/card'
import PVDialog from 'primevue/dialog'

// Widgets
import { WidgetInterface, defaultWidgetComponent } from 's7k-widgets-core'

// GraphQL
import gql from 'graphql-tag'
import {
  useWidgetCoreLocationListQuery,
  type WidgetCoreLocationListQueryVariables,
  type CoreLocation
} from '@/graphql'

// Our Components
import LocationSelect from '@/components/core/location/CoreLocationSelect.vue'

// Props
const props = defineProps({ ...defaultWidgetComponent.props })

// Reactive Variables
const showAttachDialog = ref(false)
const locationsToAttach = ref<CoreLocation[]>([])
const locations = ref<CoreLocation[]>([])
const displayLocations = ref<CoreLocation[]>([])
const variables = ref<WidgetCoreLocationListQueryVariables>({
  includeIds: []
})

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data || !v.content.data.locations) return
  if (locations.value === v.content.data.locations) return

  locations.value = v.content.data.locations

  variables.value.includeIds = locations.value.map((item) => {
    return item.id
  })
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetCoreLocationList($includeIds: [ID!]) {
    core {
      location {
        list(includeIds: $includeIds) {
          data {
            id
            name
            type
            description
            address
            created_at
            updated_at
          }
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
        }
      }
    }
  }
`
const { onResult, loading } = useWidgetCoreLocationListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const data = result.data.core.location.list.data as CoreLocation[]
  const paginatorInfo = result.data.core.location.list.paginatorInfo
  displayLocations.value = data
})

// watch(props,(v) => {
//     if (!v.content) return;
//     if (v.content.data == null) return;
//     locations.value = v.content.data.locations
//     const locationIDs = locationsToAttach.value.map((item) => {return item.id});
//     variables.value.includeIds = locationIDs;
// },  {deep: true })

// Functions
function attachLocations() {
  const id = props.content.data.id
  // TODO: Filter the locations already listed.
  const locationIDs = locationsToAttach.value.map((item) => {
    return item.id
  })

  props.content.update({
    input: {
      id: props.content.data.id,
      locations: {
        connect: locationIDs
      }
    }
  })
  showAttachDialog.value = false
  locationsToAttach.value = []
}
</script>
