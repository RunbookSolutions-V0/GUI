import type { AllTypes as T } from 's7k-widgets-core'

import ContactWidgets from './Contact'
import NoteWidgets from './Note'
import AttachmentWidgets from './Attachment'
import DeviceWidgets from './Device'
import LocationWidgets from './Location'
import NetworkWidgets from './Network'
import NetworksWidgets from './Networks'

const widgets = [
  ...ContactWidgets,
  ...NoteWidgets,
  ...AttachmentWidgets,
  ...DeviceWidgets,
  ...LocationWidgets,
  ...NetworkWidgets,
  ...NetworksWidgets
] as T.ManagedWidget[]

export default widgets
