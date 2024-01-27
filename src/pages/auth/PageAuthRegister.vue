<template>
  <div class="flex h-screen">
    <Card class="m-auto min-w-96">
      <template #header>
        <div class="text-center mb-5">
          <img
            v-if="settings.darkMode"
            src="../../assets/logo-dark.svg"
            class="h-24 m-auto p-2"
            alt="Logo"
          />
          <img
            v-if="!settings.darkMode"
            src="../../assets/logo.svg"
            class="h-24 m-auto p-2"
            alt="Logo"
          />
          <div class="text-900 text-3xl font-medium mb-3">Register</div>
          <span class="text-600 font-medium line-height-3">Your Account</span>
        </div>
      </template>
      <template #content>
        <div>
          <label for="name" class="block text-900 font-medium mb-2">Name</label>
          <InputText v-model:="input.name" id="name" type="text" class="w-full mb-3" />

          <label for="email1" class="block text-900 font-medium mb-2">Email</label>
          <InputText v-model:="input.email" id="email1" type="text" class="w-full mb-3" />

          <label for="password1" class="block text-900 font-medium mb-2">Password</label>
          <InputText v-model:="input.password" id="password1" type="password" class="w-full mb-3" />

          <label for="password1" class="block text-900 font-medium mb-2"
            >Password Confirmation</label
          >
          <InputText
            v-model:="input.password_confirmation"
            id="password1"
            type="password"
            class="w-full mb-3"
          />

          <div class="flex align-items-center justify-content-between mb-6">
            <RouterLink
              :to="{ name: 'auth.login' }"
              class="font-medium no-underline ml-2 text-primary-500 text-right cursor-pointer"
            >
              Login Instead
            </RouterLink>
          </div>

          <Button label="Register" class="w-full" @click="register"></Button>
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

import type { RegisterInput } from '@/graphql'

import { useRoute } from 'vue-router'

const input = ref<RegisterInput>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

function register() {
  const auth = useAuthStore()
  auth.register(input.value)
}
</script>
