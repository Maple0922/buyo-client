export const routes = [
  {
    path: "/",
    name: "list",
    component: () => import("./components/pages/list/index.vue"),
  },
  {
    path: "/reserve",
    children: [
      {
        path: "",
        name: "reserve",
        component: () => import("./components/pages/reserve/index.vue"),
      },
      {
        path: ":id/edit",
        name: "reserve.edit",
        component: () => import("./components/pages/reserve/edit.vue"),
      },
    ],
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () => import("./components/pages/schedule/index.vue"),
  },
];
