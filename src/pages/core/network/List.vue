<template>
    <div class="card">
        <PVDataTable 
            :value="networks"
            :loading="loading"
            filterDisplay="row"
            tableStyle="min-width: 50rem"
        >
            <template #empty> No Networks found. </template>
            <template #loading> Loading network data. Please wait. </template>
            <PVColumn field="id" header="ID">
                <template #body="slotProps">
                    <RouterLink :to="{name:'core.network.view', params: { id: slotProps.data.id}}">{{ slotProps.data.id }}</RouterLink>
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
            <PVColumn field="parent_id" header="Parent ID">
                <template #body="slotProps">
                    <RouterLink
                        v-if="slotProps.data.parent_id"
                        :to="{
                            name:'core.network.view', 
                            params: { 
                                id: slotProps.data.parent_id
                            }
                        }"
                    >
                        {{ slotProps.data.parent_network.name }}
                    </RouterLink>
                </template>
            </PVColumn>
            <PVColumn field="network" header="Network" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.network }}
                </template>
                <template #filter="{ }">
                    <PVInputText v-model="filter.network" type="text" class="p-column-filter" placeholder="Search by network" />
                </template>
            </PVColumn>
            <PVColumn field="description" header="Description"></PVColumn>
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
    useCoreNetworkListQuery,
    type CoreNetworkQueriesListArgs,
type CoreNetwork
} from "@/graphql"

// Prime Vue
import PVButton from 'primevue/button';
import PVDataTable from 'primevue/datatable';
import PVColumn from 'primevue/column';
import PVInputText from 'primevue/inputtext'
import PVDropdown from 'primevue/dropdown'
import { useDialog } from 'primevue/usedialog';

// Our Compoents
import Create from "./Create.vue";
import GraphQLPaginator from "@/components/GraphQLPaginator.vue"

// Dialog
const dialog = useDialog();

// Define our Reactive Variables
const filter = ref<
    {
        name: String | null,
        network: String | null,
    }
>({
    name: null,
    network: null,
});

const variables = ref<CoreNetworkQueriesListArgs>({
    first: 10,
    page: 1,
    name: null,
    network: null,
});
const networks = ref<CoreNetwork[]>([]);
const paginator = ref({});

// GraphQL
const GraphQLDocument = gql`
query coreNetworkList($perPage: Int, $page: Int, $name: String, $network: String) {
    core {
      network {
        list(first: $perPage, page: $page, name: $name, network: $network) {
          data {
            id
            name
            parent_id
            description
            created_at
            network
            mask
            updated_at
            parent_network {
                id
                name
            }
          }
          paginatorInfo {
            firstItem
            lastItem
            count
            currentPage
            hasMorePages
            lastPage
            perPage
            total
          }
        }
      }
    }
  }`;
const { loading, error, onResult } = useCoreNetworkListQuery(variables);
onResult((result) => {
    if (!result.data) return;

    const response = result.data.core.network.list
    networks.value = response.data as CoreNetwork[];
    paginator.value = response.paginatorInfo;
});

// Some Watchers
watch(filter, (v) => {
    // Name
    if (!v.name) 
        variables.value.name = null
    else
        variables.value.name = "%" + v.name + "%"

    // Network
    if (!v.network) 
        variables.value.network = null
    else
        variables.value.network = "%" + v.network + "%"
}, { deep: true });


// Functions
function showCreate() {
    dialog.open(Create, {
        props: {
            header: "New Network",
            modal: true,
        }
    });
};
</script>
