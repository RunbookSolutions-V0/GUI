<template>
  <div class="flex mb-2">
    <span class="relative flex-grow">
      <InputText
        v-bind="$attrs"
        autocomplete="off"
        class="peer"
        placeholder=""
        :pt="preset"
        :ptOptions="{ mergeSections: false, mergeProps: false }"
      />
      <label
        :for="$attrs.inputId"
        class="absolute text-sm text-primary-500 dark:text-primary-400/60 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {{ label }}
      </label>
    </span>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext'
defineOptions({
  inheritAttrs: false
})

defineProps(['label'])

const preset = {
  root: ({ instance, state }) => ({
    class: [
      'w-full',
      // Font
      'font-sans leading-none',

      // Spacing
      'm-0',
      { 'px-3 pb-3 pt-5': instance.$attrs.mode === 'filled' },
      { 'px-3 pb-4 pt-4': instance.$attrs.mode !== 'filled' },

      // Colors
      'placeholder:text-background-400 dark:placeholder:text-background-500',
      'bg-background-0 dark:bg-background-900',
      'shadow-sm',
      {
        'text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-400/10 border-b-2 border-primary-400 dark:border-primary-400/60 rounded-none':
          instance.$attrs.mode === 'filled'
      },
      {
        'text-surface-700 dark:text-surface-300 bg-primary-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-lg':
          instance.$attrs.mode !== 'filled'
      },

      // States
      {
        'hover:border-primary-500 dark:hover:border-primary-400': !state.disabled,
        'focus:outline-none focus:border-primary-600 dark:focus:border-primary-300':
          !state.disabled,
        'opacity-60 select-none pointer-events-none cursor-default': state.disabled
      },

      // Misc
      'transition-colors duration-200'
    ]
  })
}
</script>
