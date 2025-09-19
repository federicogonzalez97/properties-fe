import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/variables.css'
import './styles/main.css'
import './styles/jsvectormap.css'
import VueVectorMapPlugin from './plugins/VueVectorMapPlugin'
import { authService } from './services/auth.service'

const initApp = async () => {
  const app = createApp(App)
  
  if (localStorage.getItem('access_token')) {
    try {
      await authService.initAuth()
    } catch (error) {
      console.error('Error inicializando auth en main:', error)
      authService.clearAuth()
    }
  }
  
  app.use(router)
  app.use(VueVectorMapPlugin)
  app.mount('#app')
}

initApp()
