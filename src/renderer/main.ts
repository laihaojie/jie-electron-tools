import { createApp } from 'vue'
import QrcodeVue from 'qrcode.vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

import './assets/css/global.scss'
import 'uno.css'

const app = createApp(App)

app.component('QrcodeVue', QrcodeVue)

app.use(router)

app.mount('#app')
