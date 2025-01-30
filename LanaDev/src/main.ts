import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './LanaDev/App.vue'
import './LanaDev/style.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
