<template>
    <div clas="mx-4 space-y-4">
        <InputTextLabel v-model="formData.name" label="Name"></InputTextLabel>
        <CoreNetworkSelect v-model="selectedParentNetwork" label="Parent Network" class="mb-2"></CoreNetworkSelect>
        <IPInput v-model="formData.network" />
        <TextAreaLabel v-model="formData.description" label="Description"></TextAreaLabel>
    </div>
    <VPButton label="Create Network" @click="createNetwork" />
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
import router from "@/router";
import gql from "graphql-tag";

import VPButton from 'primevue/button';
import InputTextLabel from '@/components/Input/InputTextLabel.vue';
import TextAreaLabel from '@/components/Input/TextAreaLabel.vue';

import CoreNetworkSelect from "@/components/core/network/CoreNetworkSelect.vue";

import IPInput from "@/components/Input/IPInput.vue";


import { 
    type CoreNetworkCreateInput,
    useCoreNetworkCreateMutation 
} from "@/graphql";

const dialogRef = inject('dialogRef');

// Form Data to Submit to Create Network
const formData = ref<CoreNetworkCreateInput>({
    name: null,
    network: "192.168.1.1/32",
    parent_id: null,
    description: null
});

const selectedParentNetwork = ref();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  mutation coreNetworkCreate($input: CoreNetworkCreateInput) {
      core {
        network {
          create(
            input: $input
          ) {
            id
          }
        }
      }
    }`;

// Submission Mutation
const { mutate: networkMutation, onDone } = useCoreNetworkCreateMutation();
function createNetwork() {
    if (selectedParentNetwork.value);
        formData.value.parent_id = selectedParentNetwork.value?.id;

    networkMutation({input: formData.value})
}
onDone((result) => {
    if(!result.data) return;
    const response = result.data.core.network.create;

    router.push({name: 'core.network.view', params: { id: response.id }});
    dialogRef.value.close();
})
</script>