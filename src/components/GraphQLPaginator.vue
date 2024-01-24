<template>
    <Paginator
        class="pt-2"
        :rows="paginator.perPage"
        :totalRecords="paginator.total"
        :first="paginator.firstItem -1"

        @update:first="updateCurrentPage"
        @update:rows="updatePerPage"
        :rowsPerPageOptions="[5, 10, 20, 25, 50, 100]"
        :alwaysShow="false"
    ></Paginator>
</template>
<script setup lang="ts">
// Imports
import { onMounted, ref, watch } from "vue"
import Paginator from 'primevue/paginator';

// Props
const props = defineProps({
    paginator: {
        type: Object,
        required: true
    },
    variables: {
        type: Object,
        required: true
    }
});
// Emits
// const $emit = defineEmits(['update:variables']);

// Functions
function updateCurrentPage(event: number) {
    const variables = props.variables;
    const newPage = Math.ceil((event/props.paginator.perPage) + 1);
    if (variables.page == newPage) return;
    variables.page = newPage;
}

function updatePerPage(event: number) {
    const variables = props.variables;
    if (variables.first == event) return;
    variables.first = event;
    if (event * variables.page > props.paginator.total)
        variables.page = 1;
}

</script>