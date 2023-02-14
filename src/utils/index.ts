export function handler_(name, index, all) {
  return index === all ? name : name + "-";
}
export function formatMusicTime(dt: number) {
  console.log("first 触发了----------------", dt);
  const minute = String(Math.floor(dt / 1000 / 60)).padStart(2, "0");
  const secound = String(Math.floor((dt / 1000) % 60)).padStart(2, "0");
  return minute + ":" + secound;
}
