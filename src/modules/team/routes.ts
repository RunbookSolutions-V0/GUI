import { type RouteRecordRaw } from 'vue-router'

import View from './pages/PageTeamView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/team/:id/view',
    name: 'team.view',
    component: View
  }
]

export default routes
