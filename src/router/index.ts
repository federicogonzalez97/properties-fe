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
  if (localStorage.getItem('access_token') && !authService.currentUser.value) {
    try {
      await authService.initAuth();
    } catch (error) {
      console.error('Error inicializando auth:', error);
      authService.clearAuth();
    }
  }

  const isAuthenticated = authService.isAuthenticated.value;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
