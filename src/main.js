import { createApp } from 'vue'
import App from './App.vue'

// 样式
import 'normalize.css/normalize.css'
import style from './style/main.scss'
// 全局
import { globalRegister } from './global'

import router from './router'
import store from './store'

import { setupStore } from './store'

const app = createApp(App)

// 注册element-plus/其他
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)
app.mount('#app')
