import { defineStore } from "pinia";
import { getCommunityRecommendVideos } from "@/service/community";
interface ICommunityState {
  recommendVideo: any[];
}
const communityStore = defineStore("community", {
  state: (): ICommunityState => ({
    recommendVideo: []
  }),
  actions: {
    getCommunityData() {
      getCommunityRecommendVideos().then((res) => {
        console.log(res);
      });
    }
  }
});

export default communityStore;
