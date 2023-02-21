type LrcType = { time: number; lrc: string };
export default interface IMusicStore {
  // 当前音乐的信息
  id: number | string;
  url: string;
  authorName: string[];
  name: string;
  coverUrl: string;
  // 当前电台
  currentDj: {
    pageID: number;
    musicID: number;
    categoryName: string;
    createTime: number;

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
  // song-detail
  songDetail: any;
  // 播放列表
  playList: any[];
  // 播放详情
  DJDetail: any;
  // 播放索引
  currentPlayIndex: number;
}
