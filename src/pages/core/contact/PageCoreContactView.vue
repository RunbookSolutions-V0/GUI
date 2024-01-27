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
          company_id
          created_at
          description
          email
          id
          name
          phone
          photo
          type
          updated_at
        }
      }
    }
  }
`
const { loading, error, onResult, refetch } = useCoreContactSingleQuery({
  id: useRoute().params.id
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
// onError((result) => {
//   console.log('Error Updating Contact!')
//   console.log(result)
// })

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
          name: 'Empty Widget',
          widgetID: 'd287d3bc-94e9-4b6d-91ce-ef4bfced75ff',
          x: 0,
          y: 0,
          w: 1,
          h: 1,
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
      }
    ]
  } as T.LayoutPage
]
</script>
