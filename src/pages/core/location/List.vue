<template>
    <div class="card" v-if="!loading && !error && locations.length > 0">
        <DataTable :value="locations" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="parent_id" header="Parent ID"></Column>
            <Column field="type" header="Type"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="address" header="Address"></Column>
        </DataTable>
    </div>
    <div v-if="error">
        {{ error }}
    </div>
    <Button icon="pi pi-plus" @click="showCreate" rounded raised text />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import { useCoreLocationListQuery } from "@/graphql/apollo.generated"
import { useDialog } from 'primevue/usedialog';

import Create from "./Create.vue";

export default defineComponent({
    name: 'LocationList',
    components: {
        DataTable,
        Column,
        Button
    },
    setup() {
        const { loading, error, onResult } = useCoreLocationListQuery();
        const locations = ref([]);
        onResult((result) => {
            if (!result.data) return;
            const response = result.data.core.location.list
            locations.value = response.data
        });

        const dialog = useDialog();
        function showCreate() {
            dialog.open(Create, {
                props: {
                    header: "New Location",
                    modal: true,
                }
            });
        }
        return {
            loading,
            error,
            locations,
            showCreate
        }
    }
});
</script>
