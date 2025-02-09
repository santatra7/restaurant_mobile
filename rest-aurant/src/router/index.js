import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import HomeAdmin from "../views/HomeAdmin.vue";
import Plats from "../views/Plats.vue";
import Stock from "../views/Stock.vue";
import AjoutPlat from "../views/AjoutPlat.vue";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/admin", name: "home-admin", component: HomeAdmin, meta: { requiresAuth: true } },
    { path: "/admin/home", name: "home-admin", component: HomeAdmin, meta: { requiresAuth: true } },
    { path: "/admin/plats", name: "plats", component: Plats, meta: { requiresAuth: true } },
    { path: "/admin/stock", name: "stock", component: Stock, meta: { requiresAuth: true } },
    { path: "/admin/ajout", name: "ajout-plat", component: AjoutPlat, meta: { requiresAuth: true } },
  ],
});

// Vérification de l'authentification avant chaque changement de route
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next("/login"); // Redirige vers la page de login si non connecté
  } else {
    next();
  }
});

export default router;