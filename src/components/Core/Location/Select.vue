<template>
    <div class="flex mb-2">
        <span class="relative flex-grow">
            <label 
                v-if="label"
                :for="$attrs.inputId"
                class="text-sm text-primary-500 dark:text-primary-400/60 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
                {{ label }}
            </label>
            <AutoComplete
                v-model="value" 
                :suggestions="items" 
                @complete="search"
                placeholder="Parent Location"
                forceSelection
            />
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import AutoComplete from 'primevue/autocomplete';

export default defineComponent({
    name: "CoreLocationSelect",
    props: {
        label: {
            type: [String || null],
            default: null
        }
    },
    components: {
        AutoComplete
    },
    setup() {
        const value = ref("");
        const items = ref<string[]>([]);

        const search = (event) => {
            items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
        }


        return {
            value,
            items,
            search
        };
    }
});
</script>