import { defineStore } from "pinia";
import { getDJTagListService } from "@/service/dj";
export interface IDJState {
  tags: any[];
  currentTagVal: any[];
}
const useDJStore = defineStore("dj", {
  state: (): IDJState => ({
    tags: [],
    currentTagVal: []
  }),
  actions: {
    getDJRecommendAction() {
      getDJTagListService().then((res) => {
        this.tags = res.data.map((item: any) => ({ name: item.categoryName }));
        this.currentTagVal = res.data.map((item: any) => item.radios);
      });
    }
  }
});

export default useDJStore;
