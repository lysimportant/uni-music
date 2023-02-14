const playStatus = [
  {
    model: "icon-loop",
    msg: "单曲循环"
  },
  {
    model: "icon-circulation",
    msg: "列表循环"
  },
  {
    model: "icon-random",
    msg: "随机播放"
  }
];

const controllerIcons = [
  "icon-per",
  "icon-zanting play",
  "icon-bofang play",
  "icon-next",
  "icon-24gf-playlist list"
];
function backClick() {
  uni.navigateBack();
}

export { playStatus, controllerIcons, backClick };
