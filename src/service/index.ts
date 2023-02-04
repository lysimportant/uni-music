import HJRequest from './request'

const hjRequest = new HJRequest({
  baseURL: 'https://lianghj.top:3000',
  timeout: 10000,
  interceptor: {
    requert(config) {
      uni.showLoading({
        title: '网络请求中',
        mask: true
      })
      let header = {}
      config.header = header
    },
    response(res) {
      if (res.statusCode !== 200) {
        uni.showToast({
          title: '请求失败',
          icon: 'error',
          mask: true
        })
      }
      uni.hideLoading()
    },
    error() {
      uni.hideLoading()
    }
  }
})
export default hjRequest
