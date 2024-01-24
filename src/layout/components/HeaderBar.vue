<template>
  <header
    class="header bg-surface-0 dark:bg-surface-700 text-surface-700 dark:text-white/80 shadow py-4 px-4"
  >
    <div class="header-content flex items-center flex-row">
      <form action="#" class="w-full pr-4">
        <div class="hidden md:flex relative">
          <div
            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            disabled
            id="search"
            type="text"
            name="search"
            class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
            placeholder="Search..."
          />
        </div>
        <div class="flex md:hidden">
          <a href="#" class="flex items-center justify-center h-10 w-10 border-transparent">
            <svg
              class="h-6 w-6 text-gray-500"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </a>
        </div>
      </form>
      <div class="flex ml-auto">
        <DarkMode class="mr-2"></DarkMode>
        <TeamSelect class="mr-2"></TeamSelect>
        <UserMenu></UserMenu>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import DarkMode from './header/DarkMode.vue'
import TeamSelect from './header/TeamSelect.vue'
import UserMenu from './header/UserMenu.vue'
</script>
