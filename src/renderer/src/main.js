import { createApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.css'
import '@/assets/base.scss'
import Verify from '@/utils/Verify.js'
import Utils from '@/utils/Utils.js'
import Request from '@/utils/Requests.js'
import Message from '@/utils/Message.js'
import Api from '@/utils/Api.js'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(Pinia.createPinia())
app.config.globalProperties.Verify = Verify
app.config.globalProperties.Utils = Utils
app.config.globalProperties.Request = Request
app.config.globalProperties.Message = Message
app.config.globalProperties.Api = Api

app.mount('#app')
