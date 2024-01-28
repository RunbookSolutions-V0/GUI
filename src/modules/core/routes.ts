import { type RouteRecordRaw } from 'vue-router'

import AttachmentRoutes from "./attachment/routes"
import ContactRoutes from "./contact/routes"
import DeviceRoutes from "./device/routes"
import LocationRoutes from "./location/routes"
import NetworkRoutes from "./network/routes"
import NetworksRoutes from "./networks/routes"
import NoteRoutes from "./note/routes"

const routes: Array<RouteRecordRaw> = ([] as Array<RouteRecordRaw>)
    .concat(AttachmentRoutes)
    .concat(ContactRoutes)
    .concat(DeviceRoutes)
    .concat(LocationRoutes)
    .concat(NetworkRoutes)
    .concat(NetworksRoutes)
    .concat(NoteRoutes)

export default routes
