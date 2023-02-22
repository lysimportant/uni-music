let player: UniApp.InnerAudioContext | UniApp.BackgroundAudioManager =
  uni.createInnerAudioContext();

// #ifndef H5
player = uni.getBackgroundAudioManager(); // UniApp.BackgroundAudioManager
// #endif
/**
 * 加载播放音乐
 * @param music 音乐数据
 * @param fn 回调操作
 */
export function loadMusic(url: any, fn?: (flag: boolean) => void) {
  player.src = url;
  player.play();
  player.onCanplay(() => {
    fn?.(true);
  });
}

/**
 * 开始播放音乐
 * @param fn 回调操作
 */
export function playMusic(fn?: (flag: boolean) => void) {
  player.play();
  fn?.(true);
}

/**
 * 暂停播放
 * @param fn 回调操作
 */
export function pauseMusic(fn?: (flag: boolean) => void) {
  player.pause();
  fn?.(false);
}

/**
 * 停止播放
 * @param fn 回调操作
 */
export function stopMusic(fn?: (flag: boolean) => void) {
  player.stop();
  fn?.(false);
}
/**
 * 暂停&播放切换 不兼容
 * @param fn 回调操作
 */
// export function toggleMusic(fn?: (flag: boolean) => void) {
//   !player.paused ? player.pause() : player.play();
//   fn?.(player.paused);
// }

/**
 * 切换音乐播放的倍数
 * @param rate 音乐播放倍速
 */
export function backRateMusic(rate = 1.0) {
  player.playbackRate = rate;
}

export function seekMusicDuration(time: number) {
  player.seek(time);
}

export default player;
export function handleBackgroundAudio(
  name: string,
  authorName: string,
  coverUrl: string
) {
  // #ifndef H5
  (player as UniApp.BackgroundAudioManager).title = name;
  (player as UniApp.BackgroundAudioManager).singer = authorName;
  (player as UniApp.BackgroundAudioManager).coverImgUrl = coverUrl;
  // #endif
}
