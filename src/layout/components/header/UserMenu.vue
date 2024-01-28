<template>
  <div class="card flex justify-center mx-auto my-auto">
    <Button
      :pt="{ root: 'w-full flex' }"
      :ptOptions="{ mergeProps: false }"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      text
    >
      <PVAvatar
        :label="authStore.user?.photo ? undefined : authStore.user?.name
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase())
                .join('')
        "
        :image="authStore.user?.photo || undefined"
      />
      <span class="flex flex-col mx-auto my-auto">
        <span class="truncate w-20 font-semibold tracking-wide leading-none">{{
          authStore.user?.name
        }}</span>
      </span>
    </Button>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
      <template #item="{ item, props }">
        <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-2" v-bind="item.badge" />
          </a>
        </RouterLink>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// PrimeVue
import PVAvatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import Badge from 'primevue/badge'

// Dynamic Dyalog
import { useDialog } from 'primevue/usedialog'
const dialog = useDialog()

// Stores
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()

// Application Components
import CreateInviation from '@/components/invitation/InvitationCreate.vue'
import CreateTeam from '@/components/team/TeamCreate.vue'
import EditProfile from '@/components/user/UserEdit.vue'

const invitationCount = ref(authStore.user?.invitations?.length || 0)
watch(
  authStore,
  (na, oa) => {
    if (!na.user || !na.user.invitations) return
    invitationCount.value = na.user.invitations.length
  },
  { deep: true }
)

const menu = ref()
const items = ref([
  // {
  //     label: 'Options',
  //     items: [
  //         {
  //             label: 'Export',
  //             icon: 'pi pi-upload',
  //             route: "/"
  //         }
  //     ]
  // },
  {
    label: 'Teams',
    items: [
      {
        label: 'View Team',
        route: { name: 'team.view', params: { id: authStore.selectedTeam } }
      },
      {
        label: 'Create Team',
        command: () => {
          dialog.open(CreateTeam, { props: { header: 'Create Team', modal: true } })
        }
      }
    ]
  },
  {
    label: 'Invitations',
    items: [
      {
        label: 'My Invitations',
        route: { name: 'invitation.list' },
        badge: {
          value: authStore.user?.invitations?.length || 0
        }
      },
      {
        label: 'Create Invitation',
        command: () => {
          dialog.open(CreateInviation, {
            props: { header: 'Create Invitation To Team', modal: true }
          })
        }
      }
    ]
  },
  {
    label: 'User',
    items: [
      {
        label: 'Edit Profile',
        command: () => {
          dialog.open(EditProfile, { props: { header: 'Edit Profile', modal: true } })
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          authStore.logout()
        }
      }
    ]
  }
])

const toggle = (event: any) => {
  menu.value.toggle(event)
}
</script>
