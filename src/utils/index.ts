export * from "./audio";

/**
 *返回一个字符串
 * @param name 名字
 * @param index 索引
 * @param all 长度
 * @returns 返回一个字符串
 */
export function handler_(name, index, all) {
  return index === all ? name : name + "-";
}

/**
 * 歌曲的总长 毫秒...
 * @param dt 时长
 * @returns 歌曲的格式化时间
 */
export function formatMusicTime(dt: number) {
  const minute = String(Math.floor(dt / 1000 / 60)).padStart(2, "0");
  const secound = String(Math.floor((dt / 1000) % 60)).padStart(2, "0");
  return minute + ":" + secound;
}

/**
 *返回显示歌词的信息
 * @param lyric 歌词数组
 * @returns 返回一个分割完的歌词和歌词对应时间的对象数组
 */
export function formatLrc(lyric: string) {
  const arr = lyric.split("\n");
  let perObj = { time: 0, lrc: "" };
  return arr.map((item) => {
    const regRxp = /\[(\d*?):(\d*?)\.(.*?)\]/g;
    const str = regRxp.exec(item);
    const m = str?.[1];
    const s = str?.[2];
    const ss = str?.[3];
    const duration = Number(m ?? 0) * 60 + Number(s) + Number(ss) / 1000;
    const lrc = item.replace(regRxp, "").trim();
    if (!isNaN(duration)) {
      perObj.time = duration;
      perObj.lrc = lrc;
    }
    return {
      time: isNaN(duration) ? perObj.time : duration,
      lrc
    };
  });
}
/**
 * 防抖函数
 * @param fn 需要执行的函数
 * @param delay 延迟的时间
 * @param imditate 是否立即执行一次
 * @returns 调用的函数
 */
export function useDebounce(
  fn: (...args) => any,
  delay: number,
  imditate?: boolean
) {
  let timer: any = null;
  function debounce(...args) {
    timer && clearInterval(timer);
    imditate && fn(args);
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  }
  // abort
  debounce.abort = function () {
    clearInterval(timer);
    timer = null;
  };

  return debounce;
}
