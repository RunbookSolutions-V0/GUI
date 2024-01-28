<template>
  <WidgetInterface v-bind="props">
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
          <div class="flex-grow">Networks</div>
          <PVButton
            v-if="displayAttachLink"
            label="Attach Networks"
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
            <PVDataTable :value="displayNetworks">
              <PVColumn field="name" header="Name"></PVColumn>
              <PVColumn field="description" header="Description"></PVColumn>
              <PVColumn field="network" header="Network"></PVColumn>
            </PVDataTable>
          </div>
          <div class="flex flex-grow"></div>
        </template>
      </template>
    </PVCard>
    <PVDialog
      v-model:visible="showAttachDialog"
      header="Attach Networks"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <NetworkSelect v-model="networksToAttach" multiple></NetworkSelect>
        <PVButton label="Attach Networks" @click="attachNetworks"></PVButton>
      </div>
    </PVDialog>
  </WidgetInterface>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

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
  useWidgetCoreNetworkListQuery,
  type WidgetCoreNetworkListQueryVariables,
  type CoreNetwork
} from '@/graphql'

// Our Components
import NetworkSelect from '@/modules/core/network/components/CoreNetworkSelect.vue'

// Props
type ExpectedContent = Record<string, any> & {
  data: {
    id: String
    networks: CoreNetwork[]
    __typename: String
  }
  update: any
}
const props = defineProps({
  ...defaultWidgetComponent.props,
  content: {
    type: Object as () => ExpectedContent,
    required: true
  }
})
// Reactive Variables
const displayAttachLink = ref(false)
const showAttachDialog = ref(false)
const networksToAttach = ref<CoreNetwork[]>([])
const networks = ref<CoreNetwork[]>([])
const displayNetworks = ref<CoreNetwork[]>([])
const variables = ref<WidgetCoreNetworkListQueryVariables>({
  includeIds: []
})

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data || !v.content.data.networks) return
  if (networks.value === v.content.data.networks) return

  networks.value = v.content.data.networks

  variables.value.includeIds = networks.value.map((item) => {
    return item.id
  })

  displayAttachLink.value = v.content.data.__typename != 'CoreDevice'
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetCoreNetworkList($includeIds: [ID!]) {
    core {
      network {
        list(includeIds: $includeIds) {
          data {
            id
            name
            description
            network
            mask
            parent_id
            parent_network {
              id
              name
              network
            }
            subnets {
              id
            }
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
const { onResult, loading } = useWidgetCoreNetworkListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const data = result.data.core.network.list.data as CoreNetwork[]
  //const paginatorInfo = result.data.core.network.list.paginatorInfo
  displayNetworks.value = data
})

// watch(props,(v) => {
//     if (!v.content) return;
//     if (v.content.data == null) return;
//     networks.value = v.content.data.networks
//     const networkIDs = networksToAttach.value.map((item) => {return item.id});
//     variables.value.includeIds = networkIDs;
// },  {deep: true })

// Functions
function attachNetworks() {
  // TODO: Filter the networks already listed.
  const networkIDs = networksToAttach.value.map((item) => {
    return item.id
  })

  props.content.update({
    input: {
      id: props.content.data.id,
      networks: {
        connect: networkIDs
      }
    }
  })
  showAttachDialog.value = false
  networksToAttach.value = []
}
</script>
