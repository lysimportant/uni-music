import { defineStore } from "pinia";
import { getSearchHotListService, getSearchByNameService } from "@/service/search";
import { getSearchDJListService } from "@/service/dj";
export interface ISearchState {
  searchHotList: any[];
  searchList: any[];
  searchSongs: any[];
  searchHotDJList: any[];
  key: string;
}
const useSearchStore = defineStore("search", {
  state: (): ISearchState => ({
    searchHotList: [],
    searchList: [],
    searchSongs: [],
    searchHotDJList: [],
    key: ""
  }),
  actions: {
    getSearchHostListAction() {
      getSearchHotListService().then((res) => {
        this.searchHotList = res.data.map((item: any) => ({
          name: item.searchWord
        }));
      });
      getSearchDJListService().then((res) => {
        console.log("first 热门dj： ", res);
        this.searchHotDJList = res.toplist.map((item: any) => ({
          id: item.id,
          name: item.name
        }));
      });
    },
    getSearchByNameAction(payload: any) {
      getSearchByNameService(payload.key, payload.type, payload.limit, payload.offset).then(
        (res) => {
          if (payload.type === 1) {
            this.searchList = res.result.songs.map((item: any) => ({
              id: item.id,
              picUrl: item.album.artist.img1v1Url,
              name: item.name,
              artists: item.artists
            }));
          } else if (payload.type === 1000) {
            this.searchSongs = res.result.playlists.map((item: any) => ({
              id: item.id,
              picUrl: item.coverImgUrl,
              name: item.name,
              playCount: item.playCount,
              trackCount: item.trackCount,
              authorName: item.creator.nickname,
              officialTags: item.officialTags
            }));
          }
        }
      );
    }
  }
});

export default useSearchStore;
