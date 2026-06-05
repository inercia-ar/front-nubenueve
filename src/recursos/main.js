import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import index from '../visores/index.vue'
import './base.css'

const app = createApp(index)

app.use(createPinia())
app.use(router)

app.mount('#app')