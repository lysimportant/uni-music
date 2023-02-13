let player: UniApp.InnerAudioContext | UniApp.BackgroundAudioManager =
  uni.createInnerAudioContext();

// #ifndef H5
player = uni.getBackgroundAudioManager(); // UniApp.BackgroundAudioManager

player.title = "致爱丽丝";
player.singer = "暂无";
player.coverImgUrl = "https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png";
player.src =
  "https://m801.music.126.net/20230212222059/7843dc1db531a514241c8a93b0027cdd/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24668927240/3e8c/a695/2e50/fbf8d60610fb5f8336c9a34a68736239.mp3";
// 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
// #endif
/**
 * 加载播放音乐
 * @param music 音乐数据
 * @param fn 回调操作
 */
export function playMusic(music: any, fn?: (flag: boolean) => void) {
  // #ifdef H5
  player.src = music.url;
  // #endif
  // #ifndef H5
  player.src = music.url;
  // #endif
  player.play();
  fn?.(true);
}

/**
 * 开始播放音乐
 * @param fn 回调操作
 */
export function startMusic(fn?: (flag: boolean) => void) {
  player.play();
  fn?.(true);
}

/**
 * 停止播放
 * @param fn 回调操作
 */
export function puaseMusic(fn?: (flag: boolean) => void) {
  player.stop();
  fn?.(false);
}

/**
 * 暂停&播放切换
 * @param fn 回调操作
 */
export function toggleMusic(fn?: (flag: boolean) => void) {
  player.paused ? player.play() : player.pause();
  fn?.(!player.paused);
}

/**
 * 切换音乐播放的倍数
 * @param rate 音乐播放倍速
 */
export function backRateMusic(rate = 1.0) {
  player.playbackRate = rate;
}
export default player;
