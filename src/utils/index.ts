export * from "./audio";
export function handler_(name, index, all) {
  return index === all ? name : name + "-";
}
export function formatMusicTime(dt: number) {
  const minute = String(Math.floor(dt / 1000 / 60)).padStart(2, "0");
  const secound = String(Math.floor((dt / 1000) % 60)).padStart(2, "0");
  return minute + ":" + secound;
}

export function formatLrc(lyric: string) {
  const arr = lyric.split("\n");
  return arr.map((item) => {
    const regRxp = /\[(\d*?):(\d*?)\.(.*?)\]/g;
    const str = regRxp.exec(item);
    const m = str?.[1];
    const s = str?.[2];
    const ss = str?.[3];
    const duration = Number(m ?? 0) * 60 + Number(s) + Number(ss) / 1000;
    const lrc = item.replace(regRxp, "").trim();
    return {
      time: duration,
      lrc
    };
  });
}
