import type { AllTypes as T } from 's7k-widgets-core'
import LocationList from './LocationList.vue'
import BasicWidget from './LocationInfo.vue'
import TreeWidget from './TreeChart.vue'

const widgets = [
  {
    name: 'Location List',
    id: 'adb7c547-597b-4f4f-9de8-8abbf426e6d3',
    as: LocationList,
    height: 2,
    width: 1,
    pages: ['core-(?!location).*-view']
  },
  {
    name: 'Location Details',
    id: 'e5adbb57-66c1-4e15-8729-139da67792d1',
    as: BasicWidget,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-location-view']
  },
  {
    name: 'Location Tree Chart',
    id: '499c1a07-4dbe-457f-aac3-1570e6341a8d',
    as: TreeWidget,
    defaultProps: {},
    height: 2,
    width: 2,
    pages: ['core-location-view']
  }
] as T.ManagedWidget[]

export default widgets
