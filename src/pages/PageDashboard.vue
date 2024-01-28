<template>
  <WidgetsPage page="dashboard" :default-layouts="layouts" />
</template>
<script setup lang="ts">
// Widgets
import type { AllTypes as T } from 's7k-widgets-core'
import { v4 as uuidv4 } from 'uuid'

// Default Widget Page Layouts
const layouts = [
  {
    id: '0000-000-000-0000',
    name: 'Dashboard',
    default: false,
    grid: {
      id: uuidv4(),
      items: [
        {
          name: 'Empty Widget',
          widgetID: 'd287d3bc-94e9-4b6d-91ce-ef4bfced75ff',
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: uuidv4(),
          moved: false
        }
      ]
    },
    hasTabs: false,
    tabs: []
  } as T.LayoutPage
]
</script>
