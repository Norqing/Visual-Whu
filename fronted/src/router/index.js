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
        redirect: "map/policy", // 禁止直接访问/map
        children: [
          {
            path: "policy",
            name: "国家政策",
            component: () => import("../pages/MapPage1.vue"),
          },
          {
            path: "local", 
            name: "地方政策",
            component: () => import("../pages/MapPage2.vue"),
          }
        ]
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
