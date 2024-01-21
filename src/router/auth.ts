import { type RouteRecordRaw } from "vue-router";

import LoginView from "../views/auth/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
    {
      path: "/auth/login",
      name: "auth.login",
      component: LoginView,
    },
  ];

export default routes;