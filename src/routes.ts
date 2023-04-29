export const routes = [
  {
    path: "/",
    name: "list",
    component: () => import("./components/pages/list/index.vue"),
  },
  {
    path: "/reserve",
    name: "reserve",
    component: () => import("./components/pages/reserve/index.vue"),
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () => import("./components/pages/schedule/index.vue"),
  },
];