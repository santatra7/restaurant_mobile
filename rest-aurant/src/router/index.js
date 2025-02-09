import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import HomeAdmin from '../views/HomeAdmin.vue'
import Plats from '../views/Plats.vue'
import Stock from '../views/Stock.vue'
import AjoutPlat from '../views/AjoutPlat.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home, },
    { path: '/login', name: 'login', component: Login, },
    { path: '/admin', name: 'home-admin', component: HomeAdmin, },
    { path: '/admin/home', name: 'home-admin', component: HomeAdmin, },
    { path: '/admin/plats', name: 'plats', component: Plats, },
    { path: '/admin/stock', name: 'stock', component: Stock, },
    { path: '/admin/ajout', name: 'ajout-plat', component: AjoutPlat, },
  ],
})

export default router;
