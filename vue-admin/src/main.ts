import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
