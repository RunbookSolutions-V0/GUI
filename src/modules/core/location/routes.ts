import { type RouteRecordRaw } from 'vue-router'

import List from './pages/PageCoreLocationList.vue'
import View from './pages/PageCoreLocationView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/core/location/list',
    name: 'core.location.list',
    component: List
  },
  {
    path: '/core/location/:id/view',
    name: 'core.location.view',
    component: View
  }
]

export default routes
