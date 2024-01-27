<template>
    <div class="flex h-screen">
      <Card class="m-auto min-w-96">
        <template #header>
          <div class="text-center mb-5">
            <img v-if="settings.darkMode" src="../../assets/logo-dark.svg" class="h-24 m-auto p-2" alt="Logo" />
            <img v-if="!settings.darkMode" src="../../assets/logo.svg" class="h-24 m-auto p-2" alt="Logo" />
            <div class="text-900 text-3xl font-medium mb-3">Password Reset</div>
            <span class="text-sm line-height-3">Please remember it?</span>
          </div>
        </template>
        <template #content>
          <div>
            <label for="token" class="block text-900 font-medium mb-2">Token</label>
            <InputText v-model:="input.token" id="token" type="text" class="w-full mb-3" />

            <label for="email1" class="block text-900 font-medium mb-2">Email</label>
            <InputText v-model:="input.email" id="email1" type="text" class="w-full mb-3" />
  
            <label for="password1" class="block text-900 font-medium mb-2">Password</label>
            <InputText v-model:="input.password" id="password1" type="password" class="w-full mb-3" />

            <label for="password1" class="block text-900 font-medium mb-2">Password Confirmation</label>
            <InputText v-model:="input.password_confirmation" id="password1" type="password" class="w-full mb-3" />
  
            <div class="flex align-items-center justify-content-between mb-6">
                <RouterLink
                    :to="{name: 'auth.login'}"
                    class="font-medium no-underline ml-2 text-primary-500 text-right cursor-pointer"
                >
                    Login Instead
                </RouterLink>
            </div>
  
            <Button label="Reset Password" class="w-full" @click="resetPassword"></Button>
          </div>
        </template>
      </Card>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue'
  import Button from 'primevue/button'
  import InputText from 'primevue/inputtext'
  import Card from 'primevue/card'
  import { useAuthStore } from '@/stores'
  
  // Settings
  import { useSettingsStore } from '@/stores'
  const settings = useSettingsStore()
  
  import { useRoute } from 'vue-router'

  const route = useRoute()
  
  const input = ref({
    token: route.query.token ? route.query.token : '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  
  function resetPassword() {
    const auth = useAuthStore()
    auth.reset_password(input.value)
  }
  </script>
  