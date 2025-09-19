import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '@/services/auth.service';

const Home = () => import('@/components/home/Home.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth) {
    const hasToken = !!localStorage.getItem('access_token');
    const hasUser = !!authService.currentUser.value;
    
    if (hasToken && !hasUser) {
      try {
        await Promise.race([
          authService.initAuth(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Router guard timeout')), 3000)
          )
        ]);
      } catch (error) {
        console.error('Error en router guard:', error);
        authService.clearAuth();
        next('/');
        return;
      }
    }
    
    if (!authService.isAuthenticated.value) {
      next('/');
      return;
    }
  }
  
  next();
});

export default router;
