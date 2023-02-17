import {
  getMusicURLByIdService,
  getCheckMusicURLByIdService,
  getMusicDetailByIdService,
  getMusicLrcService
} from "@/service/music";
import { getDjDetailService } from "@/service/dj";

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
    dt: number;
  };
  // 当前电台
  currentDj: any;
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
        dt: 0,
        name: "",
        picUrl: "",
        url: ""
      },
      currentDj: {},
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
          getDjDetailService(djId).then((res) => {
            this.currentDj = res.program;
            this.duration = res.program.duration;
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
