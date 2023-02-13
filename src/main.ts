import { createSSRApp } from "vue";
import uView from "./uni_modules/vk-uview-ui";
import registerStore from "@/store";
import "./static/iconfont/iconfont.css";

import App from "./App.vue";

import "normalize.css";

export function createApp() {
  const app = createSSRApp(App);
  registerStore(app);
  app.use(uView);
  return {
    app
  };
}
