import WidgetCoreContactList from './WidgetCoreContactList.vue'

const widgets = [
  {
    name: 'Contact List',
    id: 'd7ce5981-e799-4d0d-9a63-e205e90c2549',
    as: WidgetCoreContactList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!contact).*-view']
  }
]

export default widgets
