<template>
  <WidgetsPage page="core-device-view" :default-layouts="layouts" :page-content="pageContent" />
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
import type { CoreDevice } from '@/graphql'
import { useCoreDeviceSingleQuery, useCoreDeviceUpdateMutation } from '@/graphql'

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
  query coreDeviceSingle($id: ID) {
    core {
      device {
        single(id: $id) {
          id
          name
          hostname
          type
          description

          contacts {
            id
          }

          attachments {
            id
          }

          notes {
            id
          }

          audits {
            id
          }

          addresses {
            id
          }

          networks {
            id
          }

          locations {
            id
          }

          created_at
          updated_at
        }
      }
    }
  }
`
const { onResult, refetch } = useCoreDeviceSingleQuery({
  id: useRoute().params.id as string
})
onResult((result) => {
  if (!result.data) return
  const device = result.data.core.device.single as CoreDevice
  if (!device) return
  pageContent.value.data = device
})
// Allow for Updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
  mutation coreDeviceUpdate($input: CoreDeviceUpdateInput!) {
    core {
      device {
        update(input: $input) {
          id
        }
      }
    }
  }
`
const { mutate, onDone } = useCoreDeviceUpdateMutation()
pageContent.value.update = mutate
onDone((result) => {
  if (!result.data) return
  const device = result.data.core.device.update
  if (!device) return
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Device Updated!',
    life: 3000
  })
  refetch()
})

// Default Widget Page Layouts
const layouts = [
  {
    id: '0000-000-000-0000',
    name: 'Device View',
    default: false,
    grid: {
      id: uuidv4(),
      items: [
        {
          name: 'Device Info',
          widgetID: '4256ff40-b0c9-496d-b0a3-28d911fb8ada',
          x: 0,
          y: 0,
          w: 1,
          h: 2,
          i: uuidv4(),
          moved: false
        },
        {
          name: 'Locations',
          widgetID: 'adb7c547-597b-4f4f-9de8-8abbf426e6d3',
          x: 1,
          y: 0,
          w: 1,
          h: 2,
          i: uuidv4(),
          moved: false
        },
        {
          name: 'Networks',
          widgetID: '34fd48f5-e05b-4f31-ab2b-94956053b8a5',
          x: 2,
          y: 0,
          w: 1,
          h: 2,
          i: uuidv4(),
          moved: false
        },
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
