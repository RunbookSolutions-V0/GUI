<template>
  <div class="card">
    <PVDataTable
      v-model:editingRows="editingRows"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      :value="contacts"
      :loading="loading"
      filterDisplay="row"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No Contacts found. </template>
      <template #loading> Loading contact data. Please wait. </template>

      <PVColumn field="photo" header="Photo" :showFilterMenu="false">
        <template #body="{ data }">
          <RouterLink
            v-if="data.photo"
            :to="{ name: 'core.contact.view', params: { id: data.id } }"
          >
            <img class="h-12 w-12 rounded-full" :src="data.photo" />
          </RouterLink>
        </template>
      </PVColumn>

      <PVColumn field="name" header="Name" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
        <template #body="{ data }">
          <RouterLink :to="{ name: 'core.contact.view', params: { id: data.id } }">
            {{ data.name }}
          </RouterLink>
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

      <PVColumn field="company_id" header="Company" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <CoreContactSelect v-model="data[field]" class="mb-2"></CoreContactSelect>
        </template>
        <template #body="{ data }">
          <RouterLink
            v-if="data.company_id"
            :to="{ name: 'core.contact.view', params: { id: data.company.id } }"
          >
            {{ data.company.name ? data.company.name : 'Changed...' }}
          </RouterLink>
        </template>
      </PVColumn>

      <PVColumn field="email" header="Email" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{}">
          <PVInputText
            v-model="filter.email"
            type="text"
            class="p-column-filter"
            placeholder="Search by email"
          />
        </template>
      </PVColumn>

      <PVColumn field="phone" header="Phone" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVInputText v-model="data[field]" />
        </template>
        <template #body="{ data }">
          {{ data.phone }}
        </template>
        <template #filter="{}">
          <PVInputText
            v-model="filter.phone"
            type="text"
            class="p-column-filter"
            placeholder="Search by phone number"
          />
        </template>
      </PVColumn>

      <PVColumn field="type" header="Type" :showFilterMenu="false">
        <template #editor="{ data, field }">
          <PVDropdown
            v-model="data[field]"
            :options="types"
            optionLabel="name"
            optionValue="value"
            placeholder="Location Type"
            class="w-full mb-2"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value }}</div>
              </div>
              <div v-else class="flex items-center">
                <div>{{ slotProps.placeholder }}</div>
              </div>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </PVDropdown>
        </template>
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
      <PVColumn
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></PVColumn>
      <PVColumn :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
        <template #body="{ data }">
          <PVButton
            @click="deleteRow({ id: data.id })"
            icon="pi pi-trash"
            aria-label="Delete"
            severity="danger"
            rounded
            text
          />
        </template>
      </PVColumn>
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
  useCoreContactDeleteMutation,
  useCoreContactUpdateMutation,
  useCoreContactListQuery,
  type CoreContactQueriesListArgs,
  type CoreContact,
  CoreContactTypes
} from '@/graphql'

// PrimeVue
import PVButton from 'primevue/button'
import PVDataTable from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVInputText from 'primevue/inputtext'
import PVDropdown from 'primevue/dropdown'
import { useDialog } from 'primevue/usedialog'

// Our Components
import GraphQLPaginator from '@/components/GraphQLPaginator.vue'
import Create from '@/components/core/contact/CoreContactCreate.vue'
import CoreContactSelect from '@/components/core/contact/CoreContactSelect.vue'

// Dialog
const dialog = useDialog()

// Define our Reactive Variables
const filter = ref<{
  name: string | null
  email: string | null
  phone: string | null
  type: string | null
}>({
  name: null,
  email: null,
  phone: null,
  type: null
})

const types = [
  { name: 'Person', value: CoreContactTypes.PERSON },
  { name: 'Company', value: CoreContactTypes.COMPANY }
]

const variables = ref<CoreContactQueriesListArgs>({
  first: 10,
  page: 1,
  name: null,
  email: null,
  phone: null,
  type: null
})

const contacts = ref<CoreContact[]>([])
const paginator = ref({})

const editingRows = ref([])

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument1 = gql`
  query coreContactList(
    $first: Int
    $page: Int
    $name: String
    $email: String
    $phone: String
    $type: CoreContactTypes
  ) {
    core {
      contact {
        list(first: $first, page: $page, name: $name, email: $email, phone: $phone, type: $type) {
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
          data {
            company_id
            company {
              id
              name
            }
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
  }
`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument2 = gql`
  mutation coreContactDelete($id: ID!) {
    core {
      contact {
        delete(id: $id) {
          id
        }
      }
    }
  }
`

// Edit Rows
const { mutate, onDone } = useCoreContactUpdateMutation()
onDone((result) => {
  if (!result.data) return
  console.info('Contact Updated')
})

// Delete Rows
const { mutate: deleteRow, onDone: rowDeleted } = useCoreContactDeleteMutation()
rowDeleted((result) => {
  if (!result.data || !result.data.core.contact.delete) return
  console.info('Contact Deleted')

  if (!result.data.core.contact.delete.id) return
  const deletedID = result.data.core.contact.delete.id

  contacts.value.forEach((contact, index) => {
    if (contact.id === deletedID) contacts.value.splice(index, 1)
  })
})

// Load our List
const { loading, error, onResult } = useCoreContactListQuery(variables)
onResult((result) => {
  if (!result.data) return

  const response = result.data.core.contact.list
  contacts.value = response.data as CoreContact[]
  paginator.value = response.paginatorInfo
})

// Some Watchers
watch(
  filter,
  (v) => {
    // Name
    if (!v.name) variables.value.name = null
    else variables.value.name = '%' + v.name + '%'

    // Email
    if (!v.email) variables.value.email = null
    else variables.value.email = '%' + v.email + '%'

    // Phone
    if (!v.phone) variables.value.phone = null
    else variables.value.phone = '%' + v.phone + '%'

    // Type
    if (!v.type) variables.value.type = null
    else variables.value.type = v.type as CoreContactTypes
  },
  { deep: true }
)

// Functions
function showCreate() {
  dialog.open(Create, {
    props: {
      header: 'New Contact',
      modal: true
    }
  })
}

const onRowEditSave = (event) => {
  let { newData, index } = event

  mutate({
    input: {
      id: newData.id,
      name: newData.name,
      parent_id: newData.parent_id,
      type: newData.type,
      description: newData.description,
      address: newData.address
    }
  })

  if (newData.company && newData.company_id != newData.company.id) {
    newData.company = null
  }

  contacts.value[index] = newData
}
</script>
