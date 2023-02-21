import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatUTC(utcStr: string, format = "YYYY-MM-DD hh:ss:mm") {
  return dayjs.utc(utcStr).utcOffset(8).format(format);
}

export function formatTimeDiff(time: number) {
  const current = new Date();
  const days = dayjs(current).diff(dayjs(time), "days") + 1;
  if (days < 10) {
    return days + "天前";
  }
  const oldTime = dayjs(time).year();
  const newTime = dayjs(current).year();
  if (oldTime === newTime) {
    return formatDate(time, "MM-DD");
  }
  return formatDate(time, "YYYY-MM-DD");
}
export function formatDate(time: number, format = "YYYY-MM-DD hh:ss:mm") {
  return dayjs(time).format(format);
}

/**
 *
 * @param count 数量
 * @returns 返回该数量的简化
 */
export function formatCount(count: number) {
  if (count > 10000) {
    return (count / 10000).toFixed(1) + "万";
  } else if (count > 100000000) {
    return (count / 100000000).toFixed(1) + "亿";
  } else {
    return count;
  }
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
 * 歌曲的总长 毫秒...
 * @param dt 时长
 * @returns 歌曲的格式化时间
 */
export function formatMusicTime(dt: number) {
  const minute = Math.floor(dt / 60)
    .toString()
    .padStart(2, "0");
  const secound = Math.floor(dt % 60)
    .toString()
    .padStart(2, "0");

  return `${minute}:${secound}`;
}
