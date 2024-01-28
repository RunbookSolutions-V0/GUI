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
          <div class="flex-grow">Notes</div>
          <PVButton
            label="New Note"
            @click="
              () => {
                showCreateDialog = true
              }
            "
          />
        </div>
      </template>
      <template #content>
        <template v-if="loading"> Loading... </template>
        <template v-else>
          <PVDataTable :value="displayNotes">
            <PVColumn field="content" header="Content"></PVColumn>
            <PVColumn field="user.name" header="By"></PVColumn>
            <PVColumn field="created_at" header="At"></PVColumn>
          </PVDataTable>
        </template>
      </template>
    </PVCard>
    <PVDialog
      v-model:visible="showCreateDialog"
      header="Create Note"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <TextAreaLabel label="Note Content" v-model="form.content"></TextAreaLabel>
        <PVButton label="Create" @click="createNote"></PVButton>
      </div>
    </PVDialog>
  </WidgetInterface>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

// PrimeVue
import PVButton from 'primevue/button'
import PVDataTable from 'primevue/datatable'
import PVColumn from 'primevue/column'
import PVCard from 'primevue/card'
import PVDialog from 'primevue/dialog'

// Widgets
import { WidgetInterface, defaultWidgetComponent } from 's7k-widgets-core'

// GraphQL
import gql from 'graphql-tag'
import {
  useWidgetCoreNoteListQuery,
  type WidgetCoreNoteListQueryVariables,
  type CoreNote,
  type CoreNoteCreateInput
} from '@/graphql'

// Our Components
import TextAreaLabel from '@/components/input/TextAreaLabel.vue'

// Props
type ExpectedContent = Record<string, any> & {
  data: {
    id: String
    notes: CoreNote[]
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
const showCreateDialog = ref(false)
const form = ref<CoreNoteCreateInput>({
  content: ''
})
const notes = ref<CoreNote[]>([])
const displayNotes = ref<CoreNote[]>([])
const variables = ref<WidgetCoreNoteListQueryVariables>({
  includeIds: []
})

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data) return
  if (notes.value === v.content.data.notes) return
  if (!v.content.data.notes) return

  notes.value = v.content.data.notes
  if (notes.value.length > 0)
    variables.value.includeIds = notes.value.map((item) => {
      return item.id
    })
})

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetCoreNoteList($includeIds: [ID!]) {
    core {
      note {
        list(includeIds: $includeIds) {
          data {
            content
            created_at
            id
            updated_at
            user {
              id
              name
              photo
              pivot {
                role
              }
            }
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
  }
`
const { onResult, loading } = useWidgetCoreNoteListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const data = result.data.core.note.list.data as CoreNote[]
  const paginatorInfo = result.data.core.note.list.paginatorInfo
  displayNotes.value = data
})

// watch(props,(v) => {
//     if (!v.content) return;
//     if (v.content.data == null) return;
//     notes.value = v.content.data.notes
//     const noteIDs = notesToAttach.value.map((item) => {return item.id});
//     variables.value.includeIds = noteIDs;
// },  {deep: true })

// Functions
function createNote() {
  // TODO: Filter the notes already listed.

  props.content.update({
    input: {
      id: props.content.data.id,
      notes: {
        create: [form.value]
      }
    }
  })
  showCreateDialog.value = false
  form.value = {
    content: ''
  }
}
</script>
