<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AuthLayout from "./layout/AuthLayout.vue";
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
</script>

<template>
  <AuthLayout v-if="authStore.user">
    <RouterView />
  </AuthLayout>
  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped></style>
