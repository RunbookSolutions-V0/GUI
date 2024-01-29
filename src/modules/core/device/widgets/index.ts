import type { AllTypes as T } from 's7k-widgets-core'

import DeviceInfo from './DeviceInfo.vue'
import DeviceList from './DeviceList.vue'

const widgets = [
  {
    name: 'Device Info',
    id: '4256ff40-b0c9-496d-b0a3-28d911fb8ada',
    as: DeviceInfo,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!device).*-view']
  },
  {
    name: 'Device List',
    id: '2949948f-f488-42d3-ba43-757f484bf98a',
    as: DeviceList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!device).*-view']
  }
] as T.ManagedWidget[]

export default widgets
