import { defineStore } from "pinia";

const useCommonStore = defineStore("common", {
  state() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight + "px"
    };
  },
  actions: {}
});

export default useCommonStore;
