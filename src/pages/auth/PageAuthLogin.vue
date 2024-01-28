<template>
  <div class="flex h-screen">
    <Card class="m-auto min-w-96">
      <template #header>
        <div class="text-center mb-5 pt-5">
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
          <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span class="text-600 font-medium line-height-3">Don't have an account?</span>
          <RouterLink
            :to="{ name: 'auth.register' }"
            class="font-medium no-underline ml-2 text-primary-500 cursor-pointer"
            >Create today!</RouterLink
          >
        </div>
      </template>
      <template #content>
        <div>
          <label for="email1" class="block text-900 font-medium mb-2">Email</label>
          <InputText v-model:="input.username" id="email1" type="text" class="w-full mb-3" />

          <label for="password1" class="block text-900 font-medium mb-2">Password</label>
          <InputText v-model:="input.password" id="password1" type="password" class="w-full mb-3" />

          <div class="flex align-items-center justify-content-between mb-6">
            <RouterLink
              :to="{ name: 'auth.forgot' }"
              class="font-medium no-underline ml-2 text-primary-500 text-right cursor-pointer"
            >
              Forgot password?
            </RouterLink>
          </div>

          <Button label="Sign In" icon="pi pi-user" class="w-full" @click="login"></Button>
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

import type { LoginInput } from '@/graphql'

import { useRoute } from 'vue-router'

const input = ref<LoginInput>({
  username: '',
  password: ''
})

const route = useRoute()

function login() {
  const auth = useAuthStore()
  auth.login(input.value.username, input.value.password, route)
}
</script>
