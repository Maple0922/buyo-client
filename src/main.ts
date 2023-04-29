import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { routes } from "./routes";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { registerSW } from "virtual:pwa-register";
registerSW();

loadFonts();

createApp(App).use(vuetify).use(router).mount("#app");
