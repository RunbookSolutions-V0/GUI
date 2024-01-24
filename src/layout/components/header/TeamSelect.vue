<template>
  <PVAutoComplete
    dropdown
    :model-value="selectedTeam"
    @update:model-value="setSelectedTeam"
    :suggestions="filteredTeams"
    option-label="name"
    data-key="id"
    @complete="search"
    :force-selection="true"
  >
    <!-- <template #option="slotProps">
            <div class="flex align-options-center">
                <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
                <div>{{ slotProps.option.name }}</div>
            </div>
        </template> -->
  </PVAutoComplete>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// Stores
import { useAuthStore } from '@/stores'

// PrimeVue
import PVAutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'

// Our Auth Store
const authStore = useAuthStore()

// Some reactive variables
const selectedTeam = ref<{ id: number | string; name: string; photo: string | null } | null>(null)
const filteredTeams = ref<{ id: number | string; name: string; photo: string | null }[]>([])

// We are Mounted
const filteredResults = [] as { id: number | string; name: string; photo: string | null }[]
authStore.teams.forEach((team) => {
  filteredResults.push({ id: team.id, name: team.name, photo: team.photo ? team.photo : null })
})
filteredTeams.value = filteredResults
setSelectedFromAuth()

function setSelectedTeam(selected: { id: number | string; name: string; photo: string | null }) {
  authStore.selectedTeam = selected.id as string
  selectedTeam.value = selected
}

function setSelectedFromAuth() {
  const selectedIndex = authStore.teams.findIndex((item) => {
    return item.id == authStore.selectedTeam
  })
  if (selectedIndex == -1) {
    console.log(authStore)
    console.error('Unable to find selected - Default')
    return
  }
  selectedTeam.value = {
    id: authStore.teams[selectedIndex].id,
    name: authStore.teams[selectedIndex].name,
    photo: authStore.teams[selectedIndex].photo || null
  }
}
function search(event: AutoCompleteCompleteEvent) {
  const filteredResults = [] as { id: number | string; name: string; photo: string | null }[]
  authStore.teams
    .filter((item) => {
      return item.name.toLowerCase().includes(event.query.toLowerCase())
    })
    .forEach((team) => {
      filteredResults.push({ id: team.id, name: team.name, photo: team.photo ? team.photo : null })
    })
  filteredTeams.value = filteredResults
}
</script>
