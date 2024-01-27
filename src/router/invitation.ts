import { type RouteRecordRaw } from 'vue-router'

import List from '@/pages/invitation/PageInvitationList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/invitations',
    name: 'invitation.list',
    component: List
  }
]

export default routes
