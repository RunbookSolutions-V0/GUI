<template>
  <WidgetsPage page="core-network-view" :default-layouts="layouts" :page-content="pageContent" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// PrimeVue
import { useToast } from 'primevue/usetoast'

// Widgets
import type { AllTypes as T } from 's7k-widgets-core'
import { v4 as uuidv4 } from 'uuid'

// GraphQL
import gql from 'graphql-tag'
import type { CoreNetwork } from '@/graphql'
import { useCoreNetworkSingleQuery, useCoreNetworkUpdateMutation } from '@/graphql'

// Define our Reactive Variables
//TODO: Define Page Content
const pageContent = ref<{ data: any; update: any }>({
  data: null,
  update: null
})

// Injects
const toast = useToast()

// GraphQL
// Get Data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
  query coreNetworkSingle($id: ID) {
    core {
      network {
        single(id: $id) {
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
            name
            network
          }

          contacts {
            id
          }

          notes {
            id
          }

          attachments {
            id
          }

          locations {
            id
          }

          devices {
            id
          }

          audits {
            id
          }

          created_at
          updated_at
        }
      }
    }
  }
`
const { loading, error, onResult, refetch } = useCoreNetworkSingleQuery({
  id: useRoute().params.id
})
onResult((result) => {
  if (!result.data) return
  const network = result.data.core.network.single as CoreNetwork
  if (!network) return
  pageContent.value.data = network
})
// Allow for Updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
  mutation coreNetworkUpdate($input: CoreNetworkUpdateInput!) {
    core {
      network {
        update(input: $input) {
          id
        }
      }
    }
  }
`
const { mutate, onDone } = useCoreNetworkUpdateMutation()
pageContent.value.update = mutate
onDone((result) => {
  if (!result.data) return
  const network = result.data.core.network.update
  if (!network) return
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Network Updated!',
    life: 3000
  })
  refetch()
})

// Default Widget Page Layouts
const layouts = [
  {
    id: '0000-000-000-0000',
    name: 'Network View',
    default: false,
    grid: {
      id: uuidv4(),
      items: [
        {
          name: 'Locations',
          widgetID: 'adb7c547-597b-4f4f-9de8-8abbf426e6d3',
          x: 0,
          y: 0,
          w: 1,
          h: 2,
          i: uuidv4(),
          moved: false
        },
        {
          name: 'Devices',
          widgetID: '2949948f-f488-42d3-ba43-757f484bf98a',
          x: 1,
          y: 0,
          w: 1,
          h: 2,
          i: uuidv4(),
          moved: false
        }
      ]
    },
    hasTabs: true,
    tabs: [
      {
        name: 'Common Relations',
        grid: {
          id: uuidv4(),
          items: [
            {
              name: 'Contacts',
              widgetID: 'd7ce5981-e799-4d0d-9a63-e205e90c2549',
              x: 0,
              y: 0,
              w: 1,
              h: 2,
              i: uuidv4(),
              moved: false
            },
            {
              name: 'Notes',
              widgetID: 'c59f7881-05cd-4482-8888-33d553a4723f',
              x: 1,
              y: 0,
              w: 1,
              h: 2,
              i: uuidv4(),
              moved: false
            },
            {
              name: 'Attachments',
              widgetID: '63832e01-f549-4cb7-8d60-0902afc2c146',
              x: 2,
              y: 0,
              w: 1,
              h: 2,
              i: uuidv4(),
              moved: false
            }
          ]
        }
      },
      {
        name: 'Audit History',
        grid: {
          items: [
            {
              name: 'Location Audits',
              widgetID: 'f3f81521-a911-40c6-b4b6-9caba2d44dc0',
              x: 0,
              y: 0,
              w: 3,
              h: 4,
              i: uuidv4(),
              moved: false
            }
          ]
        }
      }
    ]
  } as T.LayoutPage
]
</script>
