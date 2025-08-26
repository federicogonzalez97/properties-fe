import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const Home = () => import('@/components/Home.vue');
const PrivacyPolicy = () => import('@/components/PrivacyPolicy.vue');
const DataDeletion = () => import('@/components/DataDeletion.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: { requiresAuth: false },
  },
  {
    path: '/data-deletion',
    name: 'DataDeletion',
    component: DataDeletion,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth) {
    const { verifyToken } = useAuth();
    const isValid = await verifyToken();

    if (!isValid) {
      next('/');
      return;
    }
  }

  next();
});

export default router;
