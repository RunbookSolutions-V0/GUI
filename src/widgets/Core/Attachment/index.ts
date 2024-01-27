import WidgetCoreAttachmentList from './WidgetCoreAttachmentList.vue'

const widgets = [
  {
    name: 'Attachment List',
    id: '63832e01-f549-4cb7-8d60-0902afc2c146',
    as: WidgetCoreAttachmentList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!attachment).*-view']
  }
]

export default widgets
