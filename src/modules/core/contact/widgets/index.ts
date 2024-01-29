import type { AllTypes as T } from 's7k-widgets-core'

import ContactInfo from './ContactInfo.vue'
import ContactList from './ContactList.vue'

const widgets = [
  {
    name: 'Contact Details',
    id: '376e124a-bab3-4128-a925-8d982bd52a8e',
    as: ContactInfo,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-contact-view']
  },
  {
    name: 'Contact List',
    id: 'd7ce5981-e799-4d0d-9a63-e205e90c2549',
    as: ContactList,
    defaultProps: {},
    height: 2,
    width: 1,
    pages: ['core-(?!contact).*-view']
  }
] as T.ManagedWidget[]

export default widgets
