import {
  getMusicURLByIdService,
  getCheckMusicURLByIdService,
  getMusicDetailByIdService
} from "@/service/music";
import { defineStore } from "pinia";
import player, { loadMusic, playMusic, pauseMusic } from "@/utils/audio";

interface IMusicStore {
  currentMusic: {
    url: string;
    authorName: string[];
    name: string;
    picUrl: string;
  };
  isPlayer: boolean;
  onlyOne: boolean;
  currentStatus: number;
}

const useMusicStore = defineStore("music", {
  state: (): IMusicStore => {
    return {
      currentMusic: {
        authorName: ["洛天依", "ilem"],
        name: "勾指起誓",
        picUrl:
          "https://p1.music.126.net/eMyCr0gv0kPGlew9XTNjyA==/109951163944178164.jpg",
        url: "https://m801.music.126.net/20230212222059/7843dc1db531a514241c8a93b0027cdd/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24668927240/3e8c/a695/2e50/fbf8d60610fb5f8336c9a34a68736239.mp3"
      },
      isPlayer: false,
      onlyOne: false,
      currentStatus: 0
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
        this.currentMusic.name = songs[0].name; // 歌曲名字
        songs[0].ar?.map((item) => {
          this.currentMusic.authorName = [];
          this.currentMusic.authorName = [
            ...this.currentMusic.authorName,
            item.name
          ];
        }); // 歌手聊表.name
        this.currentMusic.picUrl = songs[0].al.picUrl; // 歌曲封面
        (player as UniApp.BackgroundAudioManager).title =
          this.currentMusic.name;
        (player as UniApp.BackgroundAudioManager).singer =
          this.currentMusic.authorName.join("/");
        (player as UniApp.BackgroundAudioManager).coverImgUrl =
          this.currentMusic.picUrl;
      });
      // 准备播放
      getMusicURLByIdService(id).then((res) => {
        this.currentMusic.url = res.data[0].url;
        loadMusic(this.currentMusic, (falg) => {
          this.isPlayer = falg;
        });
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
