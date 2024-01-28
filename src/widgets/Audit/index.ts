import type { AllTypes as T } from 's7k-widgets-core'

import WidgetAuditList from './WidgetAuditList.vue'

const widgets = [
  {
    name: 'Audit List',
    id: 'f3f81521-a911-40c6-b4b6-9caba2d44dc0',
    as: WidgetAuditList,
    defaultProps: {},
    height: 2,
    width: 3,
    pages: ['core-.*-view', 'dashboard']
  }
] as T.ManagedWidget[]

export default widgets
