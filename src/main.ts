import { createApp } from 'vue'
import fa from 'element-plus/dist/locale/fa.mjs'
import 'element-plus/dist/index.css'
import './style.scss'
import ElementPlus from 'element-plus'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'


const app = createApp(App)
app.use(VueQueryPlugin)
app.use(router)
app.use(ElementPlus, {
    locale: fa,
})
app.mount('#app')
