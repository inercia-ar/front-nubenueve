import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import index from '../index.vue'
import '../styles.css'

const app = createApp(index)

app.use(createPinia())
app.use(router)

app.mount('#app')