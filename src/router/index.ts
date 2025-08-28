import { createRouter, createWebHistory } from 'vue-router';

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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
