<template>
  <WidgetInterface v-bind="$props">
    <PVCard
      class="h-full w-full overflow-auto"
      :pt-options="{ mergeProps: false, mergeSections: true }"
      :pt="{
        body: 'py-5 h-full flex flex-col',
        content: 'px-5 md:px-6'
      }"
    >
      <template #title>
        <div class="flex">
          <div class="flex-grow">Audits</div>
        </div>
      </template>
      <template #content>
        <template v-if="loading"> Loading... </template>
        <template v-else>
          <PVDataTable scrollable scrollHeight="flex" :value="displayAudits">
            <PVColumn field="created_at" header="Timestamp" />
            <PVColumn field="event" header="Event">
              <template #body="slotProps">
                {{ slotProps.data.event.charAt(0).toUpperCase() + slotProps.data.event.slice(1) }}
              </template>
            </PVColumn>
            <PVColumn field="user" header="By">
              <template #body="slotProps">
                <template v-if="slotProps.data.user.__typename == 'User'">
                  <div class="flex">
                    <PVAvatar
                      class="rounded mx-auto my-auto"
                      v-if="slotProps.data.user.photo"
                      :image="slotProps.data.user.photo"
                    />
                    <span class="mx-auto my-auto">
                      {{ slotProps.data.user.name }}
                    </span>
                  </div>
                </template>
                <template v-else-if="slotProps.data.user.__typename == 'Agent'">
                  Agent...
                </template>
                <template v-else>
                  {{ slotProps.data.user }}
                </template>
              </template>
            </PVColumn>
            <PVColumn field="new_values" header="New Values">
              <template #body="slotProps">
                <pre>{{
                  slotProps.data.new_values
                    .replaceAll('{', '{\n')
                    .replaceAll('}', '\n}')
                    .replaceAll(',', ',\n')
                    .replaceAll(':', ': ')
                }}</pre>
              </template>
            </PVColumn>
            <PVColumn field="old_values" header="Old Values">
              <template #body="slotProps">
                <pre>{{
                  slotProps.data.old_values
                    .replaceAll('{', '{\n')
                    .replaceAll('}', '\n}')
                    .replaceAll(',', ',\n')
                    .replaceAll(':', ': ')
                }}</pre>
              </template>
            </PVColumn>
            <PVColumn field="user_agent" header="User Agent" />
            <PVColumn field="ip_address" header="IP" />
          </PVDataTable>
        </template>
      </template>
    </PVCard>
  </WidgetInterface>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// PrimeVue
import PVButton from 'primevue/button'
import PVDataTable from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVCard from 'primevue/card'
import PVAvatar from 'primevue/avatar'

// Widgets
import { WidgetInterface, defaultWidgetComponent } from 's7k-widgets-core'

// GraphQL
import gql from 'graphql-tag'
import { useWidgetAuditListQuery, type WidgetAuditListQueryVariables, type Audit } from '@/graphql'

// Props
type ExpectedContent = Record<string, any> & {
  data: {
    id: String
    audits: Audit[]
  }
  update: any
}
const props = defineProps({
  ...defaultWidgetComponent.props,
  content: {
    type: Object as () => ExpectedContent,
    required: true
  }
})

// Reactive Variables
const audits = ref<Audit[]>([])
const displayAudits = ref<Audit[]>([])
const variables = ref<WidgetAuditListQueryVariables>({
  includeIds: null
})
const itemID = ref<String>('')

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data) return
  if (audits.value === v.content.data.audits) return
  if (!v.content.data.audits) return

  audits.value = v.content.data.audits
  if (audits.value.length > 0)
    variables.value.includeIds = audits.value.map((item) => {
      return item.id
    })
  itemID.value = v.content.data.id
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetAuditList($includeIds: [ID!], $first: Int, $page: Int) {
    audit {
      list(includeIds: $includeIds, page: $page, first: $first) {
        data {
          auditable_id
          auditable_type
          created_at
          event
          id
          ip_address
          new_values
          old_values
          tags
          url
          user {
            ... on User {
              id
              name
              photo
            }
            ... on Agent {
              id
              name
            }
          }
          user_agent
        }
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
      }
    }
  }
`
const { onResult, loading } = useWidgetAuditListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const data = result.data.audit.list.data as Audit[]
  const paginatorInfo = result.data.audit.list.paginatorInfo
  displayAudits.value = data
})
</script>
