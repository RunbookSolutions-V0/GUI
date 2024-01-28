import type { AllTypes as T } from 's7k-widgets-core'

import AgentWidgets from "./agent/widgets"
import AgentsWidgets from "./agents/widgets"
import AuditWidgets from "./audit/widgets"
import CoreWidgets from "./core/widgets"
import InvitationWidgets from "./invitation/widgets"
import TeamWidgets from "./team/widgets"
import UserWidgets from "./user/widgets"

const widgets = [
    ...AgentWidgets,
    ...AgentsWidgets,
    ...AuditWidgets,
    ...CoreWidgets,
    ...InvitationWidgets,
    ...TeamWidgets,
    ...UserWidgets
] as T.ManagedWidget[]

export default widgets
