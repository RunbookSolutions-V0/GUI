import type { AllTypes as T } from 's7k-widgets-core'

import AddressWidgets from "./address/widgets"

const widgets = [
    ...AddressWidgets,
] as T.ManagedWidget[]

export default widgets