import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/variables.css'
import './styles/main.css'
import './styles/jsvectormap.css'
import VueVectorMapPlugin from './plugins/VueVectorMapPlugin'

const app = createApp(App)
app.use(router)
app.use(VueVectorMapPlugin)
app.mount('#app')
