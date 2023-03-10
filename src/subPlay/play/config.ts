const playStatus = [
  {
    model: "icon-loop",
    msg: "单曲播放"
  },
  {
    model: "icon-circulation",
    msg: "列表播放"
  },
  {
    model: "icon-random",
    msg: "随机播放"
  }
];

const controllerIcons = [
  "icon-per per",
  "icon-zanting play",
  "icon-bofang play",
  "icon-next next",
  "icon-24gf-playlist list"
];
function backClick() {
  uni.navigateBack();
}

export { playStatus, controllerIcons, backClick };
