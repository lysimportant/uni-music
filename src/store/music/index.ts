import {
  getMusicURLByIdService,
  getCheckMusicURLByIdService,
  getMusicDetailByIdService,
  getMusicLrcService
} from "@/service/music";
import { defineStore } from "pinia";
import player, { loadMusic, playMusic, pauseMusic } from "@/utils/audio";
type LrcType = { time: number; lrc: string; id?: number };
interface IMusicStore {
  // 当前音乐的信息
  currentMusic: {
    id: number;
    url: string;
    authorName: string[];
    name: string;
    picUrl: string;
    dt: number;
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
}

const useMusicStore = defineStore("music", {
  state: (): IMusicStore => {
    return {
      currentMusic: {
        id: 0,
        authorName: [],
        dt: 0,
        name: "",
        picUrl: "",
        url: ""
      },
      isPlayer: false,
      onlyOne: false,
      currentStatus: 0,
      currentTime: 0,
      duration: 0,
      lrcs: []
    };
  },
  actions: {
    async getMusicURLByIdAction(id: string) {
      // 是否可以播放
      const res = await getCheckMusicURLByIdService(id);
      if (!res.success) {
        return uni.showToast({
          title: res.message,
          duration: 2000
        });
      }
      // 详情
      getMusicDetailByIdService(id).then(({ songs }) => {
        const [song] = songs;
        console.log("歌曲信息：  ----->>>>>>    ", song);
        this.currentMusic.id = songs.id;
        this.currentMusic.name = song.name; // 歌曲名字
        this.currentMusic.dt = song.dt; // 歌曲时长
        song.ar?.map((item) => {
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
      // 准备播放
      getMusicURLByIdService(id).then((res) => {
        this.currentMusic.url = res.data[0].url;
        loadMusic(this.currentMusic, (falg) => {
          this.isPlayer = falg;
        });
      });
      getMusicLrcService(id).then((res) => {
        const arr = (res.lrc.lyric as string).split("\n");
        let lrcArr: { time: number; lrc: string }[] = [];
        arr.forEach((item) => {
          const regRxp = /\[(\d*?):(\d*?)\.(.*?)\]/g;
          const str = regRxp.exec(item);
          const m = str?.[1];
          const s = str?.[2];
          const ss = str?.[3];
          const duration =
            Number(m ?? 0) * 60 +
            Number(s) +
            parseFloat((Number(ss) / 100).toFixed(3));
          const lrc = item.replaceAll(regRxp, "").trim();
          console.log(duration, item);
          lrcArr.push({
            time: duration,
            lrc
          });
        });
        this.lrcs = lrcArr;
      });
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
