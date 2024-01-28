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
          <div class="flex-grow">Devices</div>
          <PVButton
            v-if="displayAttachLink"
            label="Attach Devices"
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
            <PVDataTable :value="displayDevices">
              <PVColumn field="name" header="Name"></PVColumn>
              <PVColumn field="hostname" header="Hostname"></PVColumn>
              <PVColumn field="type" header="Type"></PVColumn>
              <PVColumn field="description" header="Description"></PVColumn>
            </PVDataTable>
          </div>
          <div class="flex flex-grow"></div>
        </template>
      </template>
    </PVCard>
    <PVDialog
      v-model:visible="showAttachDialog"
      header="Attach Devices"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <DeviceSelect v-model="devicesToAttach" multiple></DeviceSelect>
        <PVButton label="Attach Devices" @click="attachDevices"></PVButton>
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
  useWidgetCoreDeviceListQuery,
  type WidgetCoreDeviceListQueryVariables,
  type CoreDevice
} from '@/graphql'

// Our Components
import DeviceSelect from '@/components/core/device/CoreDeviceSelect.vue'

// Props
const props = defineProps({ ...defaultWidgetComponent.props })

// Reactive Variables
const displayAttachLink = ref(false)
const showAttachDialog = ref(false)
const devicesToAttach = ref<CoreDevice[]>([])
const devices = ref<CoreDevice[]>([])
const displayDevices = ref<CoreDevice[]>([])
const variables = ref<WidgetCoreDeviceListQueryVariables>({
  includeIds: []
})

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data || !v.content.data.devices) return
  if (devices.value === v.content.data.devices) return

  devices.value = v.content.data.devices

  variables.value.includeIds = devices.value.map((item) => {
    return item.id
  })

  displayAttachLink.value = v.content.data.__typename != 'CoreNetwork'
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetCoreDeviceList($includeIds: [ID!]) {
    core {
      device {
        list(includeIds: $includeIds) {
          data {
            id
            name
            hostname
            description
            type
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
const { onResult, loading } = useWidgetCoreDeviceListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const data = result.data.core.device.list.data as CoreDevice[]
  const paginatorInfo = result.data.core.device.list.paginatorInfo
  displayDevices.value = data
})

// Functions
function attachDevices() {
  const id = props.content.data.id
  // TODO: Filter the devices already listed.
  const deviceIDs = devicesToAttach.value.map((item) => {
    return item.id
  })

  props.content.update({
    input: {
      id: props.content.data.id,
      devices: {
        connect: deviceIDs
      }
    }
  })
  showAttachDialog.value = false
  devicesToAttach.value = []
}
</script>
