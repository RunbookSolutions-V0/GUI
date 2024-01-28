import type { AllTypes as T } from 's7k-widgets-core'
import AuditWidgets from './Audit'
import CoreWidgets from './Core'

const widgets = [...CoreWidgets, ...AuditWidgets] as T.ManagedWidget[]

export default widgets
