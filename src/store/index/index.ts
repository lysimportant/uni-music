import { defineStore } from "pinia";
import {
  getIndexBannerService,
  getIndexDiscoverIconsService,
  getIndexRecommendService,
  getIndexNewSongs
} from "@/service/index/index";

import { getIndexHotDjService } from "@/service/dj";
interface IIndexState {
  banners: any[]; // 轮播图
  discoverIcons: any[]; // 推荐图标
  songs: any[]; // 推荐歌单
  newSongs: any[]; // 推荐新歌
  djList: any[]; // 热门播客
}

const indexStore = defineStore("index", {
  state: (): IIndexState => {
    return {
      banners: [],
      discoverIcons: [],
      songs: [],
      newSongs: [],
      djList: []
    };
  },
  actions: {
    getIndexDataAction(): void {
      // banner
      getIndexBannerService().then((res) => {
        this.banners = res.banners?.map((item: any) => {
          return { image: item.pic, title: item.typeTitle };
        });
      });
      // icons
      getIndexDiscoverIconsService().then((res) => {
        this.discoverIcons = res.data.map((item, index) => ({
          ...item,
          ...urls[index]
        }));
      });
      //songs
      getIndexRecommendService().then((res) => {
        this.songs = res.result;
      });
      // newsongs
      getIndexNewSongs().then((res) => {
        this.newSongs = res.result;
      });
      // djs
      getIndexHotDjService().then((res) => {
        this.djList = res.toplist.map((item) => item.program);
      });
    }
  }
});

export default indexStore;

const urls = [
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/discover.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/fm.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/songs.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/pxb.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/%E7%9B%B4%E6%92%AD.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/%E6%95%B0%E5%AD%97.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/%E6%9C%89%E5%A3%B0%E8%AF%BB%E4%B9%A6.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/%E5%85%B3%E6%B3%A8%E6%96%B0%E6%AD%8C.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/%E6%94%B6%E8%97%8F.jpg.png?x-oss-process=style/mystyle",
    path: ""
  },
  {
    iconUrl:
      "http://test.lianghj.top/uni-music/uni-music-index-icon-png/game.jpg.png?x-oss-process=style/mystyle",
    path: ""
  }
];
