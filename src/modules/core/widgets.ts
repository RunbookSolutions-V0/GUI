import type { AllTypes as T } from 's7k-widgets-core'

import AttachmentWidgets from "./attachment/widgets"
import ContactWidgets from "./contact/widgets"
import DeviceWidgets from "./device/widgets"
import LocationWidgets from "./location/widgets"
import NetworkWidgets from "./network/widgets"
import NetworksWidgets from "./networks/widgets"
import NoteWidgets from "./note/widgets"

const widgets = [
    ...AttachmentWidgets,
    ...ContactWidgets,
    ...DeviceWidgets,
    ...LocationWidgets,
    ...NetworkWidgets,
    ...NetworksWidgets,
    ...NoteWidgets,
] as T.ManagedWidget[]

export default widgets