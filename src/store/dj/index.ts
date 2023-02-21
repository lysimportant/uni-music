import { defineStore } from "pinia";
import { getDjAllDetailService, getDjDetailService } from "@/service/dj";
interface DJStoreState {
  detail: any;
  list: any[];
}
const DJStore = defineStore("dj", {
  state: (): DJStoreState => ({
    detail: {},
    list: []
  }),
  actions: {
    async getDJDetailActions(id: number) {
      const res = await getDjAllDetailService(id);
      this.list = res.programs;
      const detail = await getDjDetailService(res.programs[0].radio.id);
      this.detail = detail.data;
      console.log(this.detail);
    }
  }
});

export default DJStore;
