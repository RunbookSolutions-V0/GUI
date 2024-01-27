<template>
  <div class="max-w-xl">
    <label
      :class="[
        props.multiple
          ? 'px-4 w-full justify-center border-2 border-dashed hover:border-gray-400 focus:outline-none'
          : '',
        'flex transition rounded-md appearance-none cursor-pointer'
      ]"
    >
      <span
        v-if="props.multiple"
        class="flex items-center space-x-2 h-32"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span class="font-medium">
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else>Drop files here or <u>click here</u> to upload.</div>
        </span>
      </span>
      <span v-else>
        <div
          class="relative items-center justify-center inline-flex text-center align-bottom text-sm px-2.5 py-1.5 min-w-[2rem] shadow-sm rounded-md text-white dark:text-background-900 bg-primary-500 dark:bg-primary-400 ring-1 ring-primary-500 dark:ring-primary-400 focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current focus:ring-offset-2 hover:bg-primary-600 dark:hover:bg-primary-300 hover:ring-primary-600 dark:hover:ring-primary-300 focus:ring-primary-500 dark:focus:ring-primary-400 transition duration-200 ease-in-out cursor-pointer overflow-hidden select-none"
        >
          <span class="duration-200 font-semibold flex-1"> Select File </span>
        </div>
      </span>
      <input
        :multiple="props.multiple"
        type="file"
        name="file_upload"
        class="hidden"
        @change="fileSelect"
      />
    </label>
  </div>
  <ul class="">
    <li v-for="file in value" :key="file.file.name">
      <PVProgressBar :value="file.progress ? file.progress : 0"></PVProgressBar>
      {{ file.file.name }}
      {{ file.progress }}%
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

// PrimeVue
import PVProgressBar from 'primevue/progressbar'

import { Vapor, type VaporOptions } from '@/helpers'
import type { VaporFileUpload } from '@/graphql'

// Custom Type
export type FileUploadReturn = {
  file: File
  vapor: VaporFileUpload | null
  progress: number
}

const props = defineProps({
  modelValue: {
    type: Array<FileUploadReturn> || (Object as () => FileUploadReturn),
    required: true
  },
  multiple: {
    type: Boolean,
    required: false,
    default: true
  }
})

const isDragging = ref(false)

const value = ref<FileUploadReturn[]>(props.modelValue ? props.modelValue : [])

// Emits
const $emit = defineEmits(['update:modelValue'])

watch(
  value,
  (v) => {
    if (props.multiple) $emit('update:modelValue', v)
    else $emit('update:modelValue', v[0])
  },
  { deep: true }
)

// Vapor
const vapor = new Vapor()

function dragover(e) {
  e.preventDefault()
  isDragging.value = true
}
function dragleave() {
  isDragging.value = false
}
function drop(e) {
  e.preventDefault()

  const files: File[] = Array.from(e.dataTransfer.files)
  processFiles(files)

  isDragging.value = false
}

function fileSelect(e) {
  const files: File[] = Array.from(e.target.files)
  processFiles(files)
}

function processFiles(files: File[]) {
  files.forEach((file: File, index: number) => {
    const upload = ref({
      file: file,
      vapor: null as VaporFileUpload | null,
      progress: -1
    })
    if (props.multiple) {
      value.value.push(upload.value)
    } else {
      value.value[0] = upload.value
    }

    vapor
      .store(file, {
        // signedStorageUrl:
        //   useConfigStore().graphqlServer + "/vapor/signed-storage-url",
        progress: (progress: number) => {
          upload.value.progress = Math.round(progress * 10000) / 100
        }
      } as VaporOptions)
      .then((response) => {
        const vaporFile: VaporFileUpload = {
          upload_uuid: response.uuid,
          key: response.key,
          bucket: response.bucket,
          name: file?.name ? file.name : (Math.random() * 200).toString(),
          content_type: file?.type ? file.type : 'Unknown'
        }
        upload.value.vapor = vaporFile
      })
  })
}
</script>
