<template>
    <div class="card">
        <PVDataTable 
            :value="contacts"
            :loading="loading"
            filterDisplay="row"
            tableStyle="min-width: 50rem"
        >
            <template #empty> No Contacts found. </template>
            <template #loading> Loading contact data. Please wait. </template>
            <PVColumn field="id" header="ID">
                <template #body="{ data }">
                    <RouterLink :to="{ name:'core.contact.view', params: { id: data.id } }">
                        {{ data.id }}
                    </RouterLink>
                </template>
            </PVColumn>

            <PVColumn field="photo" header="Photo" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.photo }}
                </template>
            </PVColumn>

            <PVColumn field="name" header="Name" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ }">
                    <PVInputText v-model="filter.name" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </PVColumn>

            <PVColumn field="company_id" header="Company" :showFilterMenu="false">
                <template #body="{ data }">
                    <RouterLink v-if="data.company_id" :to="{name:'core.contact.view', params: { id: data.company.id }}">
                        {{ data.company.name }}
                    </RouterLink>
                </template>
            </PVColumn>

            <PVColumn field="email" header="Email" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.email }}
                </template>
                <template #filter="{ }">
                    <PVInputText v-model="filter.email" type="text" class="p-column-filter" placeholder="Search by email" />
                </template>
            </PVColumn>

            <PVColumn field="phone" header="Phone" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.phone }}
                </template>
                <template #filter="{ }">
                    <PVInputText v-model="filter.phone" type="text" class="p-column-filter" placeholder="Search by phone number" />
                </template>
            </PVColumn>

            <PVColumn field="type" header="Type" :showFilterMenu="false">
                <template #filter="{ }">
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

        </PVDataTable>
    </div>
    <GraphQLPaginator :variables="variables" :paginator="paginator"></GraphQLPaginator>

    <PVButton icon="pi pi-plus" @click="showCreate" rounded raised text />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

// GraphQL
import gql from "graphql-tag";
import { 
    useCoreContactListQuery,
    type CoreContactQueriesListArgs,
    type CoreContact,
    CoreContactTypes
} from "@/graphql"

// PrimeVue
import PVButton from 'primevue/button';
import PVDataTable from 'primevue/datatable';
import PVColumn from 'primevue/column';
import PVInputText from 'primevue/inputtext'
import PVDropdown from 'primevue/dropdown'
import { useDialog } from 'primevue/usedialog';

// Our Components
import GraphQLPaginator from "@/components/GraphQLPaginator.vue"
import Create from "./Create.vue";

// Dialog
const dialog = useDialog();

// Define our Reactive Variables
const filter = ref<
    {
        name: string | null, 
        email: string | null, 
        phone: string | null, 
        type: string | null
    }
>({
    name: null,
    email: null,
    phone: null,
    type: null,
});

const types = [
    { name: 'Person', value: CoreContactTypes.PERSON },
    { name: 'Company', value: CoreContactTypes.COMPANY },
]

const variables = ref<CoreContactQueriesListArgs>({
    first: 10,
    page: 1,
    name: null,
    email: null,
    phone: null,
    type: null
});

const contacts = ref<CoreContact[]>([]);
        const paginator = ref({});

// GraphQL
const GraphQLDocument = gql`
query coreContactList($first: Int, $page: Int, $name: String, $email: String, $phone: String $type: CoreContactTypes) {
    core {
        contact {
          list(first: $first, page: $page, name: $name, email: $email,  phone: $phone, type: $type) {
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
  }`;
const { loading, error, onResult } = useCoreContactListQuery(variables);
onResult((result) => {
    if (!result.data) return;
            
    const response = result.data.core.contact.list;
    contacts.value = response.data as CoreContact[];
    paginator.value = response.paginatorInfo;

});

// Some Watchers
watch(filter, (v) => {
    // Name
    if (!v.name) 
        variables.value.name = null
    else
        variables.value.name = "%" + v.name + "%"
                
    // Email
    if (!v.email) 
        variables.value.email = null
    else
        variables.value.email = "%" + v.email + "%"

    // Phone
    if (!v.phone) 
        variables.value.phone = null
    else
        variables.value.phone = "%" + v.phone + "%"

    // Type
    if (!v.type)
        variables.value.type = null;
    else
        variables.value.type = v.type.value;
}, { deep: true });


// Functions
function showCreate() {
    dialog.open(Create, {
        props: {
            header: "New Contact",
            modal: true,
        }
    });
};
</script>
