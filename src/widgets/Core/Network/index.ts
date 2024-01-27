import WidgetCoreNetworkList from './WidgetCoreNetworkList.vue'

const widgets = [
  {
    name: 'Network List',
    id: '34fd48f5-e05b-4f31-ab2b-94956053b8a5',
    as: WidgetCoreNetworkList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!network).*-view']
  }
]

export default widgets
