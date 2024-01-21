import { type RouteRecordRaw } from "vue-router";

import contact from "./contact";
import device from "./device";
import location from "./location";
import network from "./network";

const routes: Array<RouteRecordRaw> = ([] as Array<RouteRecordRaw>)
    .concat(contact)
    .concat(device)
    .concat(location)
    .concat(network);

export default routes;