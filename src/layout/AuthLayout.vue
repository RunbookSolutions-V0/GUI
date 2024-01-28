<template>
  <div class="flex flex-row min-h-screen">
    <SideBar />
    <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <HeaderBar />
      <div class="main-content flex flex-col flex-grow p-4">
        <!-- <BreadcrumbsComponent /> -->
        <slot />
      </div>

      <FooterBar></FooterBar>
    </main>
  </div>
</template>
<script setup lang="ts">
// Our Components
import SideBar from './components/SideBar.vue'
import HeaderBar from './components/HeaderBar.vue'
import BreadcrumbsComponent from './components/BreadcrumbsComponent.vue';
import FooterBar from './components/FooterBar.vue'
</script>
