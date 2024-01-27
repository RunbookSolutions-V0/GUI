<template>
  <WidgetInterface v-bind="$props">
    <PVCard
      class="h-full w-full"
      :pt-options="{ mergeProps: false, mergeSections: true }"
      :pt="{
        body: 'py-5 h-full flex flex-col',
        content: 'px-5 md:px-6'
      }"
    >
      <template #title>
        <div class="flex">
          <div class="flex-grow">Contacts</div>
          <PVButton
            label="Attach Contacts"
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
            <PVDataTable :value="displayContacts">
              <PVColumn field="name" header="Name"></PVColumn>
              <PVColumn field="company" header="Company"></PVColumn>
              <PVColumn field="email" header="Email"></PVColumn>
              <PVColumn field="phone" header="Phone"></PVColumn>
            </PVDataTable>
          </div>
          <div class="flex flex-grow"></div>
        </template>
      </template>
    </PVCard>
    <PVDialog
      v-model:visible="showAttachDialog"
      header="Attach Contacts"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <ContactSelect v-model="contactsToAttach" multiple></ContactSelect>
        <PVButton label="Attach Contacts" @click="attachContacts"></PVButton>
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
  useWidgetCoreContactListQuery,
  type WidgetCoreContactListQueryVariables,
  type CoreContact
} from '@/graphql'

// Our Components
import ContactSelect from '@/components/core/contact/CoreContactSelect.vue'

// Props
const props = defineProps({ ...defaultWidgetComponent.props })

// Reactive Variables
const showAttachDialog = ref(false)
const contactsToAttach = ref([])
const contacts = ref([])
const displayContacts = ref<CoreContact[]>([])
const variables = ref<WidgetCoreContactListQueryVariables>({
  includeIds: []
})

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data) return
  if (contacts.value === v.content.data.contacts) return
  if (!v.content.data.contacts) return
  contacts.value = v.content.data.contacts

  if (contacts.value.length > 0)
    variables.value.includeIds = contacts.value.map((item) => {
      return item.id
    })
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetCoreContactList($includeIds: [ID!]) {
    core {
      contact {
        list(includeIds: $includeIds) {
          data {
            company {
              name
              id
            }
            description
            email
            name
            id
            phone
            photo
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
const { onResult, loading } = useWidgetCoreContactListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const data = result.data.core.contact.list.data
  const paginatorInfo = result.data.core.contact.list.paginatorInfo
  displayContacts.value = data
})

// watch(props,(v) => {
//     if (!v.content) return;
//     if (v.content.data == null) return;
//     contacts.value = v.content.data.contacts
//     const contactIDs = contactsToAttach.value.map((item) => {return item.id});
//     variables.value.includeIds = contactIDs;
// },  {deep: true })

// Functions
function attachContacts() {
  const id = props.content.data.id
  // TODO: Filter the contacts already listed.
  const contactIDs = contactsToAttach.value.map((item) => {
    return item.id
  })

  props.content.update({
    input: {
      id: props.content.data.id,
      contacts: {
        connect: contactIDs
      }
    }
  })
  showAttachDialog.value = false
  contactsToAttach.value = []
}
</script>
