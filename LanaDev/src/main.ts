import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '/LanaDev/src/App.vue'
import '/LanaDev/src/style.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
