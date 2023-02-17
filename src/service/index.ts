import HJRequest from "./request";

const hjRequest = new HJRequest({
  baseURL: "https://lianghj.top:3000",
  // baseURL: 'http://121.43.177.133:3000',
  timeout: 10000,
  interceptor: {
    requert(config) {
      uni.showLoading({
        title: "网络请求中",
        mask: true
      });
      let header = {
        //   cookie: `NMTID=00OhOh15oL4G9YV9Ufch8qo9-9g_t0AAAGGNXRwfA; MUSIC_U=ccbdd94dddaa7938eeffabd2155e6a8863caaa794533fa5f4d311a023b9fc02d2db2b90205957188c3860ac945710b999afd5702b87e6bfbf3c51e259c4eb7c585006f8cab2ed44fd4dbf082a8813684; __csrf=ef77ec5dc95c763e6adbc3b4c6638d84`
      };
      config.header = header;
      if ((config.url as string).includes("?")) {
        config.url = `${config.url}&timestamp=${Date.parse(new Date() + "")}`;
      } else {
        config.url = `${config.url}?timestamp=${Date.parse(new Date() + "")}`;
      }
    },
    response(res) {
      if (res.statusCode !== 200) {
        uni.showToast({
          title: "请求失败",
          icon: "error",
          mask: true
        });
      }
      uni.hideLoading();
    },
    error(err) {
      console.log("error", err);
      uni.hideLoading();
    }
  }
});

export default hjRequest;
