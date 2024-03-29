import { type RouteRecordRaw } from 'vue-router'

import List from './pages/PageCoreContactList.vue'
import View from './pages/PageCoreContactView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/core/contact/list',
    name: 'core.contact.list',
    component: List
  },
  {
    path: '/core/contact/:id/view',
    name: 'core.contact.view',
    component: View
  }
]

export default routes
