import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//element-plus
import "element-plus/dist/index.css"
import ElementPlus from "element-plus"
//pinia
import { createPinia } from 'pinia'
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()



app.use(ElementPlus)
app.use(pinia)
app.mount('#app')