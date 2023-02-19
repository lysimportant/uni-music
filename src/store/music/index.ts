import {
  getMusicURLByIdService,
  getCheckMusicURLByIdService,
  getMusicDetailByIdService,
  getMusicLrcService
} from "@/service/music";
import {
  getDjPlayDetailService,
  getDjDetailService,
  getReommendDjService
} from "@/service/dj";

import { defineStore } from "pinia";
import { loadMusic, playMusic, pauseMusic, formatLrc } from "@/utils";
import player from "@/utils/audio";
type LrcType = { time: number; lrc: string };
interface IMusicStore {
  // 当前音乐的信息
  currentMusic: {
    id: number | string;
    url: string;
    authorName: string[];
    name: string;
    picUrl: string;
  };
  // 当前电台
  currentDj: {
    name: string;
    pageID: number;
    musicID: number;
    authorName: string[];
    categoryName: string;
    createTime: number;
    coverUrl: string;
    desc: string;
    listenerCount: number;
    radio: {
      id: number;
      name: string;
      subCount: number;
      updatedTime: number;
      coverUrl: string;
      shareCount: number;
    };
    recommend: any[];
  };
  // 是否在播放
  isPlayer: boolean;
  // 第一次播放
  onlyOne: boolean;
  // 播放模式： 0 单曲 1 列表 2 随机
  currentStatus: number;
  // 当前时间
  currentTime: number;
  // 总时长
  duration: number;
  // 歌词数组
  lrcs: LrcType[];
  // 当前歌词高亮
  currentIndex: number;
  // 音乐|播客 0|1
  type: number;
}

const useMusicStore = defineStore("music", {
  state: (): IMusicStore => {
    return {
      currentMusic: {
        id: 1,
        authorName: [],
        name: "",
        picUrl: "",
        url: ""
      },
      currentDj: {
        name: "",
        pageID: 0,
        musicID: 0,
        authorName: [],
        coverUrl: "",
        categoryName: "",
        createTime: 0,
        desc: "",
        listenerCount: 0,
        radio: {
          id: 0,
          name: "",
          subCount: 0,
          updatedTime: 0,
          coverUrl: "",
          shareCount: 0
        },
        recommend: []
      },
      isPlayer: false,
      onlyOne: false,
      currentStatus: 0,
      currentTime: 0,
      duration: 0,
      currentIndex: 0,
      lrcs: [],
      type: 0
    };
  },
  actions: {
    async getMusicURLByIdAction(id: string, type?: number, djId?: number) {
      try {
        // 是否可以播放
        const res = await getCheckMusicURLByIdService(id);
        if (!res.success) {
          return uni.showToast({
            title: res.message,
            duration: 2000
          });
        }

        if (!type) {
          this.type = 0;
          // 详情
          getMusicDetailByIdService(id).then((res) => {
            const [song] = res.songs;
            this.duration = song.dt;
            this.currentMusic.id = id;
            this.currentMusic.name = song.name; // 歌曲名字
            song.ar?.map((item: any) => {
              this.currentMusic.authorName = [];
              this.currentMusic.authorName = [
                ...this.currentMusic.authorName,
                item.name
              ];
            }); // 歌手聊表.name
            this.currentMusic.picUrl = song.al.picUrl; // 歌曲封面
            // #ifndef H5
            (player as UniApp.BackgroundAudioManager).title =
              this.currentMusic.name;
            (player as UniApp.BackgroundAudioManager).singer =
              this.currentMusic.authorName.join("/");
            (player as UniApp.BackgroundAudioManager).coverImgUrl =
              this.currentMusic.picUrl;
            // #endif
          });
          // 获取歌词
          getMusicLrcService(id).then((res) => {
            const lrc = formatLrc(res.lrc.lyric);
            this.lrcs = lrc;
          });
        } else {
          this.type = 1;
          const res = await getDjPlayDetailService(djId);
          this.currentDj.name = res.program.name; // 播放播客的名字
          this.currentDj.coverUrl = res.program.coverUrl; // 图片
          this.currentDj.pageID = res.program.id; // 当前播放播客的id
          this.currentDj.musicID = res.program.mainTrackId; // 获取音频的id
          this.currentDj.authorName = [res.program.mainSong.artists[0].name]; // 播客的作者
          this.currentDj.desc = res.program.description;
          this.currentDj.categoryName = res.program.categoryName;
          this.currentDj.createTime = res.program.createTime;
          this.currentDj.listenerCount = res.program.listenerCount;
          this.currentDj.radio.id = res.program.radio.id;
          this.duration = res.program.duration; // 时长
          getDjDetailService(this.currentDj.radio.id).then(({ data }) => {
            console.log(data);
            this.currentDj.radio.name = data.name;
            this.currentDj.radio.coverUrl = data.picUrl;
            this.currentDj.radio.updatedTime = data.lastProgramCreateTime;
            this.currentDj.radio.subCount = data.subCount;
            this.currentDj.radio.shareCount = data.shareCount;
            console.log(this.currentDj.radio);
          });
          getReommendDjService().then((res) => {
            console.log(res.djRadios);
            this.currentDj.recommend = res.djRadios;
          });
        }

        // 准备播放
        getMusicURLByIdService(id).then((res) => {
          this.currentMusic.url = res.data[0].url;
          loadMusic(this.currentMusic, (falg) => {
            this.isPlayer = falg;
          });
        });
      } catch (e) {
        //TODO handle the exception
        console.log("catch: ", e);
      }
    },
    toggleMusicAction() {
      if (this.isPlayer) {
        pauseMusic();
        this.isPlayer = false;
      } else {
        playMusic();
        this.isPlayer = true;
      }
    }
  }
});
export default useMusicStore;
