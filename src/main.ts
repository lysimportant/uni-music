import { createSSRApp } from 'vue'
import App from './App.vue'
import './static/iconfont/iconfont.css'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
