<template>
    <div
      class="mb-4 w-full px-1 py-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white"
    >
      <span
        v-for="(segment, $index) in segments"
        :key="'IP' + $index"
        class="w-1/5"
      >
        <label class="sr-only">{{ segment }}</label>
        <input
          type="number"
          ref="segmentInput"
          class="w-1/5 text-center text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          style="border: none"
          v-model="segments[$index]"
          onfocus="this.select();"
          v-on:keydown="onInputKeydown($event, $index)"
          v-on:input="onInput($event as InputEvent, $index)"
          v-on:paste="onPaste($event, $index)"
        />
        <i v-show="$index != segments.length - 1">.</i>
      </span>
      <span class="w-1/5">
        <select
          v-model="mask"
          v-if="withMask"
          class="text-center text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          style="border: none"
        >
          <option v-for="m in masks" :value="m" :key="m">/{{ m }}</option>
        </select>
      </span>
    </div>
  </template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  withMask: {
    type: Boolean,
    default: true
  }
});

// Emits
const $emit = defineEmits(['update:modelValue']);

// Reactive Data
const mask =  ref('32');
const masks = ref([
  '32','31','30','29','28','27','26','25','24', '23',
  '23','21','20','19','18','17','16','15','14','13',
  '12','11','10','9','8','7','6','5','4','3','2','1'
]);
const segments = ref<[number, number, number, number]>([127, 0, 0, 1])
// The HTML input forms ... Magic...
const segmentInput = ref<HTMLElement[]>();

// Our Computed Return Value
const returnValue = computed(() => {
  return segments.value.join(".") + (props.withMask ? `/${mask.value}` : "");
});

// "Mounted"
syncIP(props.modelValue);

// Some Watchers
watch(returnValue, (v) => {
  $emit("update:modelValue", v)
}, { deep: true });

// Our functions
function syncIP(ip: string) {
  if (ip.indexOf("/") !== -1) {
    mask.value = ip.split("/")[1];
    ip = ip.split("/", 2)[0];
  }
  if (ip && ip.indexOf(".") !== -1) {
    ip.split(".").map((segment: any, index: any) => {
      if (isNaN(segment) || segment < 0 || segment > 255) {
        segment = 255;
      }
      segments.value.splice(index, 1, segment);
      return segment;
    });
  }
};

function onInputKeydown(event: KeyboardEvent, index: number) {
        const keyCode = event.keyCode || event.which;
        // The value at the input from the event
        const targetValue = (event.target as HTMLInputElement).value;

        //Backspace & Left Arrow
        // if (keyCode === 8 || keyCode === 37) {
        //   // First input; can't move left
        //   if (index == 0) return;

        //   // If the input length is 0
          
        //   this.segmentInput[index - 1].focus();
        //   // When jump to pre input(enter "backspace"), thr cursor should in the end.
        //   // before fix: 127.|0.0.0  =>   12|7.0.0.1
        //   // after fix: 127.|0.0.0 = >   127|.0.0.0
        //   // notes: "|" mean the cursor position.
        //   event.preventDefault();
          
        //   return;
        // }

        // // Right Arrow & Decimal
        // if (keyCode === 39 || keyCode === 110) {
        //   // Last Input; can't move right
        //   if (index === 3 ) return;

        //   // We got a decimail
        //   if (keyCode === 110) {
        //     event.preventDefault();
        //   }

        //   this.segmentInput[index + 1].focus();

        //   return;
        // }
      };

function onInput(event: InputEvent, index: number) {
        const value = (event.target as HTMLInputElement).value;
        let segment = Number(value);
        if (isNaN(segment)) return;

        // If > 255 set to 255
        if (segment > 255) segment = 255;
        // If < 0 set to 0
        if (segment < 0) segment = 0;
        segments.value[index] = segment;

        if (value.length === 3 && index < 3) {
          segmentInput.value[index + 1].focus();
        }

      };

function onPaste(e: ClipboardEvent, index: number) {
        
        if(!e.clipboardData) return;
        let pasteText = e.clipboardData.getData("text/plain") as string;

        // First Input Field Just overwrite it
        if (index == 0) {
          syncIP(pasteText);
          e.preventDefault();
        }

        // We have a mask included
        if (pasteText.indexOf("/") !== -1) {
          mask.value = pasteText.split("/")[1];
          pasteText = pasteText.split("/", 2)[0]
        }

        // Prefom The Update...
        pasteText.split(".").forEach((segment, i) => {
          const value = Number(segment);
          if (index + i < 4 && !isNaN(value) && value >= 0 && value <= 255) {
            segments.value[index + i] = value;
          }
        });
      };
</script>