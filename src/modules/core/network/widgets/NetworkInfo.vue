<template>
  <WidgetInterface v-bind="$props">
    <PVCard
      v-if="network"
      class="h-full w-full overflow-auto"
      :pt-options="{ mergeProps: false, mergeSections: true }"
      :pt="{
        body: 'py-5 h-full flex flex-col',
        content: 'px-5 md:px-6 flex flex-grow'
      }"
    >
      <template #title> {{ network.name }} </template>
      <template #content>
        <dl>
          <div class="px-4 py-3 sm:px-0">
            <dt class="text-sm font-bold leading-6">Description</dt>
            <dd class="mt-1 text-sm leading-6 sm:mt-2">{{ network.description }}</dd>
          </div>
          <div class="px-4 py-3 sm:px-0" v-if="network.parent_id">
            <dt class="text-sm font-bold leading-6">Parent Network</dt>
            <dd class="mt-1 text-sm leading-6 sm:mt-2">
              <RouterLink
                :to="{
                  name: 'core.network.view',
                  params: {
                    id: network.parent_network?.id
                  }
                }"
              >
                {{ network.parent_network?.name }}
              </RouterLink>
            </dd>
          </div>
          <div class="px-4 py-3 sm:px-0">
            <dt class="text-sm font-bold leading-6">Network</dt>
            <dd class="mt-1 text-sm leading-6 sm:mt-2">{{ network.network }}</dd>
          </div>
          <div class="px-4 py-3 sm:px-0">
            <dt class="text-sm font-bold leading-6">Network Mask</dt>
            <dd class="mt-1 text-sm leading-6 sm:mt-2">{{ network.mask }}</dd>
          </div>
        </dl>
        <p class="m-0"></p>
      </template>
      <template #footer>
        <div class="grid grid-cols-2">
          <div class="grid-col-1">
            <dl>
              <dt class="text-xs font-bold">Created At</dt>
              <dd class="mt-1 text-xs">{{ network.created_at }}</dd>
            </dl>
          </div>
          <div class="grid-col-1">
            <dl>
              <dt class="text-xs font-bold">Updated At</dt>
              <dd class="mt-1 text-xs">{{ network.updated_at }}</dd>
            </dl>
          </div>
        </div>
      </template>
    </PVCard>
    <div v-else>Loading...</div>
  </WidgetInterface>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

// Prime Vue
import PVCard from 'primevue/card'

// Widgets
import { WidgetInterface, defaultWidgetComponent } from 's7k-widgets-core'

// GraphQL
import type { CoreNetwork } from '@/graphql'

//Props
type ExpectedContent = Record<string, any> & {
  data: CoreNetwork
  update: any
}
const props = defineProps({
  ...defaultWidgetComponent.props,
  content: {
    type: Object as () => ExpectedContent,
    required: true
  }
})

// Reactive variables
const network = ref<CoreNetwork>(props.content.data as CoreNetwork)

watch(
  props,
  (v) => {
    network.value = v.content.data as CoreNetwork
  },
  { deep: true }
)
</script>
