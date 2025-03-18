import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/IndexPage.vue"),
      },
      {
        path: "map",
        name: "map",
        component: () => import("../pages/MapPage.vue"),
      },
      {
        path: "data",
        name: "data",
        component: () => import("../pages/DataPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
