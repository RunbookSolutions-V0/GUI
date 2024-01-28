<template>
  <WidgetInterface v-bind="$props">
    <PVCard
      v-if="location"
      class="h-full w-full overflow-auto"
      :pt-options="{ mergeProps: false, mergeSections: true }"
      :pt="{
        body: 'py-5 h-full flex flex-col',
        content: 'px-5 md:px-6 flex flex-grow justify-center'
      }"
    >
      <template #title> Location Chart </template>
      <template #content>
        <PVOrganizationChart v-if="chart" :value="chart" :collapsible="false">
          <!-- <template #BUILDING="slotProps">
                        <span>Building: {{ slotProps.node.label }}</span>
                    </template>
                    <template #OTHER="slotProps">
                        <span>OTHER: {{ slotProps.node.label }}</span>
                    </template> -->
          <template #LOAD_MORE="slotProps">
            <button @click="getChildren(slotProps.node.parent_id)">Load Children Locations</button>
          </template>
          <template #default="slotProps">
            <span>
              {{ slotProps.node.type }}:
              <RouterLink
                :to="{
                  name: 'core.location.view',
                  params: {
                    id: slotProps.node.key
                  }
                }"
              >
                {{ slotProps.node.label }}
              </RouterLink>
            </span>
          </template>
        </PVOrganizationChart>
      </template>
    </PVCard>
    <div v-else>Loading...</div>
  </WidgetInterface>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

// Prime Vue
import PVCard from 'primevue/card'
import PVOrganizationChart, { type OrganizationChartNode } from 'primevue/organizationchart'

// Widgets
import type { AllTypes as T } from 's7k-widgets-core'
import { WidgetInterface, defaultWidgetComponent } from 's7k-widgets-core'

// GraphQL
import gql from 'graphql-tag'
import {
  useWidgetCoreLocationTreeQuery,
  type WidgetCoreLocationTreeQueryVariables
} from '@/graphql'
import type { CoreLocation } from '@/graphql'

// Props
const props = defineProps({ ...defaultWidgetComponent.props })

// Reactive Variables
const location = ref<CoreLocation>(props.content.data as CoreLocation)

const chart = ref<OrganizationChartNode>()
const variables = ref<WidgetCoreLocationTreeQueryVariables>({
  parentId: ''
})

initializeChart()

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data) return
  if (location.value === v.content.data) return
  location.value = v.content.data as CoreLocation
  variables.value.parentId = (v.content.data as CoreLocation).id
  initializeChart()
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetCoreLocationTree($parentId: ID) {
    core {
      location {
        list(parentId: $parentId) {
          data {
            id
            name
            type
          }
        }
      }
    }
  }
`
const { onResult } = useWidgetCoreLocationTreeQuery(variables)
onResult((response) => {
  if (!response.data || !response.data.core.location.list.data) return
  const rawChildren = response.data.core.location.list.data as CoreLocation[]
  const children = [] as OrganizationChartNode[]

  rawChildren.forEach((location) => {
    children.push({
      key: location.id,
      label: location.name,
      type: location.type,
      children: [
        {
          key: 'none',
          type: 'LOAD_MORE',
          parent_id: location.id,
          label: 'Load Children'
        }
      ]
    })
  })
  if (variables.value.parentId) addItemToChart(variables.value.parentId, children)
})

// Functions
function initializeChart() {
  if (!location.value) return
  chart.value = {
    key: location.value.id,
    label: location.value.name,
    type: location.value.type,
    children: [
      {
        key: 'none',
        type: 'LOAD_MORE',
        parent_id: location.value.id,
        label: 'Load Children'
      }
    ]
  }
}

function addItemToChart(key: string | number, children = [] as OrganizationChartNode[]) {
  if (!chart.value) {
    return
  }
  if (key === chart.value.key) {
    chart.value.children?.concat(children)
  }

  const findAndAddChildren = (node: OrganizationChartNode ) => {
    if (!node) return
    if (node.key === key) {
      // Found the node, append children and remove the 'none' child
      children.forEach((child) => {
        node.children?.push(child)
      })
      // node.children = my_child;
      node.children = (node.children as OrganizationChartNode[]).filter(
        (child) => child.key !== 'none'
      )
      return
    }

    // If the current node has children, recursively search in each child
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        findAndAddChildren(child)
      }
    }
  }
  findAndAddChildren(chart.value)
}

function getChildren(parent_id: string | number) {
  variables.value.parentId = parent_id as string
}
</script>
