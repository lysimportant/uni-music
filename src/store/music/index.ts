import {
  getMusicURLByIdService,
  getCheckMusicURLByIdService,
  getMusicDetailByIdService,
  getMusicLrcService,
  getMusicSongDetailService
} from "@/service/music";
import {
  getDjPlayDetailService,
  getDjDetailService,
  getReommendDjService,
  getDjAllDetailService
} from "@/service/dj";
import { defineStore } from "pinia";
import { loadMusic, playMusic, pauseMusic, formatLrc } from "@/utils";
import player from "@/utils/audio";
import type IMusicStore from "./type";

const useMusicStore = defineStore("music", {
  state: (): IMusicStore => ({
    name: "",
    authorName: [],
    coverUrl: "",
    url: "",
    id: 0,

    isPlayer: false,
    currentStatus: 0,
    currentTime: 0,
    duration: 0,
    type: 0,

    currentDj: {
      pageID: 0,
      musicID: 0,
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
    onlyOne: false,

    currentIndex: 0,
    lrcs: [],
    songDetail: {},
    playList: [],
    DJDetail: {},
    currentPlayIndex: 0
  }),
  actions: {
    async getMusicURLByIdAction(
      id: string,
      type?: number,
      djId?: number,
      single_flag?: boolean
    ) {
      try {
        pauseMusic((falg: boolean) => {
          this.isPlayer = falg;
          this.currentTime = 0;
          this.duration = 0;
        });
        // 判断是否在列表当中
        const _music = this.playList.findIndex((item: any) => item.id === id);
        if (_music >= 0) {
          player.stop();
          player.src = this.playList[_music].url;
          //
          this.name = this.playList[_music].name;
          this.id = this.playList[_music].id;
          this.authorName = this.playList[_music].authorName;
          this.duration = this.playList[_music].duration;
          this.coverUrl = this.playList[_music].coverUrl;
          this.currentPlayIndex = _music;
          player.play();
          return uni.showToast({
            title: "已在列表当中, 正在为您播放~~"
          });
        }
        // 是否可以播放
        const res = await getCheckMusicURLByIdService(id);
        if (!res.success) {
          return uni.showToast({
            title: res.message,
            duration: 2000
          });
        }
        //
        if (!type) {
          this.type = 0;
          if (this.playList[0]?.type) {
            this.playList = [];
          }
          // 详情
          const res = await getMusicDetailByIdService([id]);
          const [song] = res.songs;
          this.duration = song.dt;
          this.id = id;
          this.name = song.name; // 歌曲名字
          console.log("first songs: ", this.name, song.name, song);
          song.ar?.map((item: any) => {
            this.authorName = [];
            this.authorName = [...this.authorName, item.name];
          });
          // 歌手聊表.name
          this.coverUrl = song.al.picUrl; // 歌曲封面
          // #ifndef H5
          (player as UniApp.BackgroundAudioManager).title = this.name;
          (player as UniApp.BackgroundAudioManager).singer =
            this.authorName.join("/");
          (player as UniApp.BackgroundAudioManager).coverImgUrl = this.coverUrl;
          // #endif
          // 获取歌词
          getMusicLrcService(id).then((res) => {
            const lrc = formatLrc(res.lrc.lyric);
            this.lrcs = lrc;
          });
        } else {
          this.type = 1;
          if (!this.playList[0]?.type) {
            this.playList = [];
          }
          const res: any = await getDjPlayDetailService(djId);
          this.name = res.program?.name; // 播放播客的名字
          this.coverUrl = res.program.coverUrl; // 图片
          this.currentDj.pageID = res.program.id; // 当前播放播客的id
          this.currentDj.musicID = res.program.mainTrackId; // 获取音频的id
          this.authorName = [res.program.mainSong.artists[0].name]; // 播客的作者
          this.currentDj.desc = res.program.description;
          this.currentDj.categoryName = res.program.categoryName;
          this.currentDj.createTime = res.program.createTime;
          this.currentDj.listenerCount = res.program.listenerCount;
          this.currentDj.radio.id = res.program.radio.id;

          this.duration = res.program.duration; // 时长

          // #ifndef H5
          (player as UniApp.BackgroundAudioManager).title = this.name;
          (player as UniApp.BackgroundAudioManager).singer =
            this.authorName.join("/");
          (player as UniApp.BackgroundAudioManager).coverImgUrl = this.coverUrl;
          // #endif
          const { data }: any = await getDjDetailService(
            this.currentDj.radio.id
          );
          this.currentDj.radio.name = data.name;
          this.currentDj.radio.coverUrl = data.picUrl;
          this.currentDj.radio.updatedTime = data.lastProgramCreateTime;
          this.currentDj.radio.subCount = data.subCount;
          this.currentDj.radio.shareCount = data.shareCount;
          getReommendDjService().then((res) => {
            this.currentDj.recommend = res.djRadios;
          });
        }
        this.id = id;
        this.currentTime = 0;

        // 准备播放

        getMusicURLByIdService([id]).then((res) => {
          this.url = res.data[0].url;

          !single_flag &&
            this.playList.unshift({
              id: id,
              name: this.name,
              url: this.url,
              authorName: this.authorName,
              duration: this.duration,
              coverUrl: this.coverUrl,
              type: type
            });
          loadMusic(this.url, (falg) => {
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
    },
    // 根据歌单ID获取歌单详情
    async getSongDetailActions(id: number) {
      const res = await getMusicSongDetailService(id);
      this.songDetail = res.playlist;

      const mids = res.playlist.trackIds.map((item: any) => item.id);
      getMusicDetailByIdService(mids).then(async (res) => {
        const urlIDS = res.songs.map((item: any) => item.id);
        const urlRes = await getMusicURLByIdService(urlIDS);

        this.songDetail.AllSongs = res.songs.map(
          (item: any, index: number) => ({
            name: item.name, // 音乐的名字
            id: item.id,
            duration: item.dt,
            authorName: item.ar.map((item: any) => item.name),
            coverUrl: item.al.picUrl,
            fee: item.fee,
            url: urlRes.data[index].url
          })
        );
        console.log(this.songDetail.AllSongs);
      });
    },
    // 获取播客详情
    async getDJDetailActions(id: number) {
      const res = await getDjAllDetailService(id);
      const urlIDS = res.programs.map((item: any) => item.mainTrackId);
      const urlRes = await getMusicURLByIdService(urlIDS);
      this.playList = res.programs;
      this.playList = res.programs.map((item: any, index: number) => ({
        id: item.id,
        djID: item.mainTrackId,
        name: item.name,
        coverUrl: item.coverUrl,
        desc: item.desc,
        scheduledPublishTime: item.scheduledPublishTime,
        listenerCount: item.listenerCount,
        duration: item.duration,
        authorName: item.mainSong.artists.map((item: any) => item.name),
        url: urlRes.data[index].url
      }));

      const detail = await getDjDetailService(res.programs[0].radio.id);
      this.DJDetail = detail.data;

      console.log("p la ylist: ", this.playList, urlIDS, urlRes);
    },
    async playListToggleActions(payload: any, tpye = 0) {
      pauseMusic((falg: boolean) => {
        this.isPlayer = falg;
        this.currentTime = 0;
        this.duration = 0;
      });
      this.type = tpye;
      const _music = this.playList.findIndex(
        (item: any) => item.id === payload.id
      );
      console.log("找到了这个=========", _music, this.playList[_music]);
      if (_music >= 0) {
        const { type, name, id, authorName, coverUrl, duration, url } =
          this.playList[_music];
        this.name = name;
        this.id = id;
        this.authorName = authorName;
        this.duration = duration;
        this.coverUrl = coverUrl;
        this.currentPlayIndex = _music;
        !type &&
          getMusicLrcService(id).then((res) => {
            const lrc = formatLrc(res.lrc.lyric);
            console.log("first 查询歌词: ", lrc);
            this.lrcs = lrc;
          });

        setTimeout(() => {
          console.log(
            "异步播放",
            type,
            name,
            id,
            authorName,
            coverUrl,
            duration,
            url
          );
          loadMusic(url, (flag: boolean) => {
            this.isPlayer = flag;
          });
        }, 50);
      }
    }
  }
});
export default useMusicStore;
