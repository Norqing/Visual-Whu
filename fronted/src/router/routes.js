const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: '/map',
    component: () => import('pages/MapPage1.vue'),
    children: [
      {
        path: 'policy',
        name: 'PolicyMap',
        component: () => import('components/PolicyMap.vue'),
        meta: { title: '非遗政策地图' }
      },
      {
        path: 'local',
        name: 'LocalMap', 
        component: () => import('components/LocalMap.vue'),
        meta: { title: '非遗文化地图' }
      }
    ]
  },
  {
    path: 'map2',
    name: 'Map2', 
    component: () => import('components/Map2.vue'), // 地图2组件
    meta: { title: '非遗文化地图' }
  }
];

export default routes;
