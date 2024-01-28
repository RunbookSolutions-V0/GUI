import { type RouteRecordRaw } from 'vue-router'

import AgentRoutes from "./agent/routes"
import AgentsRoutes from "./agent/routes"
import AuditRoutes from "./audit/routes"
import CoreRoutes from "./core/routes"
import InvitationRoutes from "./invitation/routes"
import TeamRoutes from "./team/routes"
import UserRoutes from "./user/routes"

const routes: Array<RouteRecordRaw> = ([] as Array<RouteRecordRaw>)
  .concat(AgentRoutes)
  .concat(AgentsRoutes)
  .concat(AuditRoutes)
  .concat(CoreRoutes)
  .concat(InvitationRoutes)
  .concat(TeamRoutes)
  .concat(UserRoutes)

export default routes
