import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import lazyPlugin from 'vue3-lazy'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.scss'
import App from './App.vue'


const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

lazyPlugin.install(app, {
    loading: '/loading.gif',
    error: '/error.jpg'
})

app.mount('#app')