import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import HomeAdmin from '../views/HomeAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: Login, },
    { path: '/home-admin', name: 'home-admin', component: HomeAdmin, },
  ],
})

export default router;
