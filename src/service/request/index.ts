import type { Method } from "./type";
interface RequestConfig {
  baseURL: string;
  timeout: number;
  interceptor?: {
    requert?: (config: any) => void;
    response?: (config: any) => void;
    error?: (err: any) => void;
  };
}
class HJRequest {
  private baseURL: string;
  private timeout: number;
  constructor(data: RequestConfig) {
    this.baseURL = data.baseURL;
    this.timeout = data.timeout;
    uni.addInterceptor("request", {
      invoke: data.interceptor?.requert,
      success: data.interceptor?.response,
      fail: data.interceptor?.error
    });
  }
  request<T = any>(method: Method, config: any) {
    return new Promise<T>((resolve, reject) => {
      uni.request({
        method,
        url: this.baseURL + config.url,
        data: config.data,
        timeout: this.timeout,
        success: (res: any) => {
          resolve(res.data);
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  }
  get<T = any>(config: any) {
    return this.request<T>("GET", config);
  }
  post<T = any>(config: any) {
    return this.request<T>("POST", config);
  }
}

export default HJRequest;
