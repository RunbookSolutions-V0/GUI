<template>
    <div clas="mx-4 space-y-4">
        <InputTextLabel v-model="formData.name" label="Name"></InputTextLabel>
        <Dropdown 
            v-model="formData.type" 
            :options="locationTypes" 
            optionLabel="name" 
            placeholder="Location Type" 
            class="w-full md:w-full mb-2"
        >
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value.name }}</div>
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
        </Dropdown>
        <CoreLocationSelect label="Parent Location" class="mb-2"></CoreLocationSelect>
        <TextAreaLabel v-model="formData.description" label="Description"></TextAreaLabel>
    </div>
    <Button label="Create Location" @click="createLocation({input: formData})" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputTextLabel from '@/components/Input/InputTextLabel.vue';
import TextAreaLabel from '@/components/Input/TextAreaLabel.vue';
import CoreLocationSelect from "@/components/Core/Location/Select.vue";


import { 
    type CoreLocationCreateInput,
    CoreLocationTypes,
    useCoreLocationCreateMutation 
} from "@/graphql/apollo.generated";

export default defineComponent({
    name: "LocationCreate",
    components: {
        Button,
        InputTextLabel,
        TextAreaLabel,
        Dropdown,
        CoreLocationSelect
    },
    setup() {
        const locationTypes = ref([
            { name: "Building", value: CoreLocationTypes.BUILDING },
            { name: 'Other', value: CoreLocationTypes.OTHER },
            { name: 'Rack', value: CoreLocationTypes.RACK },
            { name: 'Room', value: CoreLocationTypes.ROOM },
        ])
        const formData = ref<CoreLocationCreateInput>({
            name: null,
            description: null,
            type: null,
            parent_id: null,
            address: null
        });
        //{name: "", type: building, description: "", parent_id: "", address: ""}
        const { mutate: createLocation, onDone } = useCoreLocationCreateMutation();
        onDone((result) => {
            console.log(result);
        })
        return {
            locationTypes,
            formData,
            createLocation
        };
    }
});
</script>