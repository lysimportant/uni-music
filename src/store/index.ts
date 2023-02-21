import type { App } from "vue";
import { createPinia } from "pinia";
// #ifdef H5
// import { createPersistedState } from 'pinia-persistedstate-plugin'
// #endif

import useIndexStore from "./index/index";
import useCommunityStore from "./community";
import useMusicStore from "./music";
import useCommonStore from "./common";
import useDJStore from "./dj";

// const res = import.meta.glob("./**/*.ts", {
//   eager: true
// });

const pinia = createPinia();

// #ifdef H5
// pinia.use(createPersistedState())
// #endif

export default function (app: App) {
  app.use(pinia);
}

export {
  useMusicStore,
  useCommunityStore,
  useIndexStore,
  useCommonStore,
  useDJStore
};
