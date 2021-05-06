import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from './icons'
import './permission' // permission control
// import './utils/error-log' // error log
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus).use(store).use(router).mount('#app')
