<template>
  <img
    v-if="selectedTeam && selectedTeam.photo"
    :alt="selectedTeam.name"
    :src="selectedTeam.photo"
    class="mr-2 w-8 h-8 mx-auto my-auto"
  />
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
    <template #option="slotProps">
      <div class="flex align-options-center">
        <img
          v-if="slotProps.option.photo"
          :alt="slotProps.option.name"
          :src="slotProps.option.photo"
          class="mr-2"
          style="width: 18px"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </PVAutoComplete>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Stores
import { useAuthStore } from '@/stores'

// PrimeVue
import PVAutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'

//
const router = useRouter()

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
  if (selected && selected.id != null) authStore.selectedTeam = selected.id as string
  selectedTeam.value = selected

  router.push({ name: 'dashboard' })
}

function setSelectedFromAuth() {
  const selectedIndex = authStore.teams.findIndex((item) => {
    return item.id == authStore.selectedTeam
  })
  if (selectedIndex == -1) {
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
