import type { Method } from './type'
interface RequestConfig {
  baseURL: string
  timeout: number
  interceptor?: {
    requert?: (config: any) => void
    response?: (config: any) => void
    error?: (err: any) => void
  }
}
class HJRequest {
  private baseURL: string
  private timeout: number
  constructor(data: RequestConfig) {
    this.baseURL = data.baseURL
    this.timeout = data.timeout
    uni.addInterceptor('request', {
      invoke: data.interceptor?.requert,
      success: data.interceptor?.response,
      fail: data.interceptor?.error
    })
  }
  request(method: Method, config: any) {
    return new Promise((resolve, reject) => {
      uni.request({
        method,
        url: this.baseURL + config.url,
        data: config.data,
        timeout: this.timeout,
        success: (res) => {
          resolve(res.data)
        },
        fail: (error) => {
          reject(error)
        }
      })
    })
  }
  get(config: any) {
    return this.request('GET', config)
  }
  post(config: any) {
    return this.request('POST', config)
  }
}

export default HJRequest
