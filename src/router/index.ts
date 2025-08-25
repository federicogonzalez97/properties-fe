import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const Home = () => import('@/components/Home.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { verifyToken } = useAuth()
    const isValid = await verifyToken()
    
    if (!isValid) {
      next('/')
      return
    }
  }
  
  next()
})

export default router
