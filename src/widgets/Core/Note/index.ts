import type { AllTypes as T } from 's7k-widgets-core'
import WidgetCoreNoteList from './WidgetCoreNoteList.vue'

const widgets = [
  {
    name: 'Notes List',
    id: 'c59f7881-05cd-4482-8888-33d553a4723f',
    as: WidgetCoreNoteList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-.*-view']
  }
] as T.ManagedWidget[]

export default widgets
