<template>
    <div clas="mx-4 space-y-4">
        <InputTextLabel v-model="form.name" label="Name"></InputTextLabel>

        <VPDropdown 
            v-model="selectedType" 
            :options="types" 
            optionLabel="name" 
            placeholder="Contact Type" 
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
        </VPDropdown>

        <CoreContactSelect 
            v-if="selectedType?.value == CoreContactTypes.PERSON" 
            v-model="selectedCompany" 
            label="Company"
            type="COMPANY"
        />

        <InputTextLabel v-model="form.email" label="Email"></InputTextLabel>
        <InputTextLabel v-model="form.phone" label="Phone"></InputTextLabel>

        <TextAreaLabel v-model="form.description" label="Description"></TextAreaLabel>

    </div>
    <VPButton label="Create Contact" @click="createContact" />
</template>
<script setup lang="ts">
import { ref, inject, watch } from 'vue';
import router from "@/router";

// GraphQL
import gql from "graphql-tag";
import {
    type CoreContactCreateInput,
    CoreContactTypes
} from "@/graphql";
import { useCoreContactCreateMutation } from "@/graphql"

// Prime Vue
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';
import VPButton from 'primevue/button';
import VPDropdown from 'primevue/dropdown';

// Our Components
import InputTextLabel from '@/components/Input/InputTextLabel.vue';
import TextAreaLabel from '@/components/Input/TextAreaLabel.vue';
import CoreContactSelect from "@/components/Core/Contact/Select.vue";

// Injections
const dialog = inject('dialogRef');

// Props

// Define our Reactive Props
const form = ref<CoreContactCreateInput>({
    name: null,
    type: CoreContactTypes.PERSON,
    description: null,
});
const selectedType = ref<{name: string, value: string}>();
const selectedCompany = ref<{name: string, id: string}>();

const types = [
    { name: 'Person', value: CoreContactTypes.PERSON },
    { name: 'Company', value: CoreContactTypes.COMPANY },
];

// GraphQL
const GraphQLDocument = gql`
  mutation coreContactCreate($input: CoreContactCreateInput!) {
      core {
        contact {
          create(
            input: $input
          ) {
            id
          }
        }
      }
    }`;
const { mutate: createMutation, onDone } = useCoreContactCreateMutation();
onDone((result) => {
    console.log(result);
    if(!result.data) return;
    router.push({
        name: 'core.contact.view', 
        params: { 
            id: result.data.core.contact.create.id
        }
    });
});

// Some Watchers
watch(() => selectedType, (v) => {
    form.value.type = v
}, { deep: true });

watch(() => selectedCompany, (v) => {
    form.value.company_id = v.value.id
}, { deep: true });

// Functions
function createContact() {
    if (!this.selectedType) return;
    this.form.type = this.selectedType.value as CoreContactTypes;
    this.createMutation({input: this.form});
    if (!this.dialog) return;
    (this.dialog as DynamicDialogInstance).close();
}
</script>