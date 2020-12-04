import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import '@/vab'
import leMarkdownEditor from 'le-markdown-editor'
// ...
/**
 * @author chuzhixin 1204505056@qq.com
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(leMarkdownEditor)
  .use(mavonEditor)
  .mount('#app')
