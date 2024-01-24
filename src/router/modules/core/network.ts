import { type RouteRecordRaw } from 'vue-router'

import List from '@/pages/core/network/PageCoreNetworkList.vue'
import View from '@/pages/core/network/PageCoreNetworkView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/core/network/list',
    name: 'core.network.list',
    component: List
  },
  {
    path: '/core/network/:id/view',
    name: 'core.network.view',
    component: View
  }
]

export default routes
