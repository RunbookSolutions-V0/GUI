<template>
<div class="flex flex-row min-h-screen">
    <SideBar></SideBar>
    <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <HeaderBar></HeaderBar>


      <div class="main-content flex flex-col flex-grow p-4">
        <slot />
      </div>
      
      <FooterBar></FooterBar>
    </main>
  </div>
  <DynamicDialog />
</template>
<script setup lang="ts">
import DynamicDialog from 'primevue/dynamicdialog';
import SideBar from "./components/SideBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
import FooterBar from "./components/FooterBar.vue";
</script>