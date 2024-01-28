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
          <div class="flex-grow">Attachments</div>
          <PVButton
            label="New Attachment"
            @click="
              () => {
                showAttachDialog = true
              }
            "
          />
        </div>
      </template>
      <template #content>
        <template v-if="loading"> Loading... </template>
        <template v-else>
          <PVDataTable :value="displayAttachments">
            <PVColumn field="name" header="Name">
              <template #body="slotProps">
                <a :href="slotProps.data.link">
                  {{ slotProps.data.name }}
                </a>
              </template>
            </PVColumn>
            <PVColumn field="size" header="Size">
              <template #body="slotProps">
                {{ formatBytes(slotProps.data.size) }}
              </template>
            </PVColumn>
          </PVDataTable>
        </template>
      </template>
    </PVCard>
    <PVDialog
      v-model:visible="showAttachDialog"
      header="Header"
      modal
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="space-y-2">
        <FileUpload v-model="attachmentsToAttach" :multiple="true"></FileUpload>
        <PVButton :disabled="uploading" label="Attach Attachments" @click="attachAttachments" />
      </div>
    </PVDialog>
  </WidgetInterface>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

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
  useWidgetCoreAttachmentListQuery,
  type WidgetCoreAttachmentListQueryVariables,
  type CoreAttachment,
  type CoreAttachmentCreateInput,
  type VaporFileUpload
} from '@/graphql'

import { formatBytes } from '@/helpers'

// Our Components
import FileUpload, { type FileUploadReturn } from '@/components/Input/FileUpload.vue'

// Props
type ExpectedContent = Record<string, any> & {
  data: {
    id: String,
    attachments: CoreAttachment[]
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
const showAttachDialog = ref(false)
const uploading = ref(false)
const attachmentsToAttach = ref<FileUploadReturn[]>([])
const attachments = ref<CoreAttachment[]>([])
const displayAttachments = ref<CoreAttachment[]>([])
const variables = ref<WidgetCoreAttachmentListQueryVariables>({
  includeIds: []
})
const itemID = ref<String>('')

// Watchers
watch(props, (v) => {
  if (!v.content || !v.content.data) return
  if (attachments.value === v.content.data.attachments) return
  if (!v.content.data.attachments) return

  attachments.value = v.content.data.attachments
  if (attachments.value.length > 0)
    variables.value.includeIds = attachments.value.map((item) => {
      return item.id
    })
  itemID.value = v.content.data.id
})

watch(
  attachmentsToAttach,
  (v) => {
    uploading.value = false
    v.forEach((file) => {
      if (file.progress != 100) uploading.value = true
    })
  },
  { deep: true }
)

// GraphQL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GraphQLDocument = gql`
  query widgetCoreAttachmentList($includeIds: [ID!]) {
    core {
      attachment {
        list(includeIds: $includeIds) {
          data {
            content_type
            created_at
            id
            link
            name
            size
            updated_at
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
const { onResult, loading } = useWidgetCoreAttachmentListQuery(variables)
onResult((result) => {
  if (!result.data) return
  const data = result.data.core.attachment.list.data as CoreAttachment[]
  const paginatorInfo = result.data.core.attachment.list.paginatorInfo
  displayAttachments.value = data
})

// watch(props,(v) => {
//     if (!v.content) return;
//     if (v.content.data == null) return;
//     attachments.value = v.content.data.attachments
//     const attachmentIDs = attachmentsToAttach.value.map((item) => {return item.id});
//     variables.value.includeIds = attachmentIDs;
// },  {deep: true })

// Functions
function attachAttachments() {
  const attachments: CoreAttachmentCreateInput[] = []
  attachmentsToAttach.value.forEach((attachment) => {
    if (!attachment.file) return
    attachments.push({
      name: attachment.file.name,
      size: attachment.file.size,
      file: attachment.vapor as VaporFileUpload
    })
  })

  props.content?.update({
    input: {
      id: itemID.value,
      attachments: {
        create: attachments
      }
    }
  })
  showAttachDialog.value = false
  attachmentsToAttach.value = []
}
</script>
