import { createApp } from 'vue'
import fa from 'element-plus/dist/locale/fa.mjs'
import 'element-plus/dist/index.css'
import './style.scss'
import ElementPlus from 'element-plus'
import router from './router'
import App from './App.vue'
import { useMovie } from './store/movie.store.ts';


const app = createApp(App)
app.use(router)
app.use(useMovie)
app.use(ElementPlus, {
    locale: fa,
})
app.mount('#app')
