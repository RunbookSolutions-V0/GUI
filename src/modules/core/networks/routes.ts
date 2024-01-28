import { type RouteRecordRaw } from 'vue-router'

import AddressRoutes from "./address/routes"

const routes: Array<RouteRecordRaw> = ([] as Array<RouteRecordRaw>)
    .concat(AddressRoutes)

export default routes
