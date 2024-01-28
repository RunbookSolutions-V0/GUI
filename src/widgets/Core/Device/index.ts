import type { AllTypes as T } from 's7k-widgets-core'
import WidgetCoreDeviceList from './WidgetCoreDeviceList.vue'

const widgets = [
  {
    name: 'Device List',
    id: '2949948f-f488-42d3-ba43-757f484bf98a',
    as: WidgetCoreDeviceList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!device).*-view']
  }
] as T.ManagedWidget[]

export default widgets
