import { createSSRApp } from 'vue'
import App from './App.vue'
import 'sanhaua/dist/style.css'

export const createApp = () => {
  const app = createSSRApp(App)
  return {
    app,
  }
}
