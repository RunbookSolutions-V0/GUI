<template>
  <WidgetsPage page="core-contact-view" :default-layouts="layouts" :page-content="pageContent" />
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
import type { CoreContact } from '@/graphql'
import { useCoreContactSingleQuery, useCoreContactUpdateMutation } from '@/graphql'

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
  query coreContactSingle($id: ID) {
    core {
      contact {
        single(id: $id) {
          id
          name
          photo
          type
          phone
          email
          description
          company_id
          company {
            id
            name
          }
          contacts: employees {
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

          networks {
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
const { onResult, refetch } = useCoreContactSingleQuery({
  id: useRoute().params.id as string
})
onResult((result) => {
  if (!result.data) return
  const contact = result.data.core.contact.single as CoreContact
  if (!contact) return
  pageContent.value.data = contact
})
// Allow for Updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
  mutation coreContactUpdate($input: CoreContactUpdateInput!) {
    core {
      contact {
        update(input: $input) {
          id
        }
      }
    }
  }
`
const { mutate, onDone, onError } = useCoreContactUpdateMutation()
pageContent.value.update = mutate
onDone((result) => {
  if (!result.data) return
  const contact = result.data.core.contact.update
  if (!contact) return
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Contact Updated!',
    life: 3000
  })
  refetch()
})

// Default Widget Page Layouts
const layouts = [
  {
    id: '0000-000-000-0000',
    name: 'Contact View',
    default: false,
    grid: {
      id: uuidv4(),
      items: [
      {
          name: 'Contact Info',
          widgetID: '376e124a-bab3-4128-a925-8d982bd52a8e',
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
        {
          name: 'Devices',
          widgetID: '2949948f-f488-42d3-ba43-757f484bf98a',
          x: 0,
          y: 2,
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
              name: 'Notes',
              widgetID: 'c59f7881-05cd-4482-8888-33d553a4723f',
              x: 0,
              y: 0,
              w: 1,
              h: 2,
              i: uuidv4(),
              moved: false
            },
            {
              name: 'Attachments',
              widgetID: '63832e01-f549-4cb7-8d60-0902afc2c146',
              x: 1,
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
