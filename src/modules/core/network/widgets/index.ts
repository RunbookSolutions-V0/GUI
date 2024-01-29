import type { AllTypes as T } from 's7k-widgets-core'

import NetworkInfo from "./NetworkInfo.vue"
import NetworkList from './NetworkList.vue'

const widgets = [
  {
    name: 'Network Information',
    id: '54567a0a-5787-4264-ade7-b14ba16c4e6e',
    as: NetworkInfo,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!network).*-view']
  },
  {
    name: 'Network List',
    id: '34fd48f5-e05b-4f31-ab2b-94956053b8a5',
    as: NetworkList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!network).*-view']
  }
] as T.ManagedWidget[]

export default widgets
