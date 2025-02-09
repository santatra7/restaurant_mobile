<template>
  <aside ref="sidebar" class="sidebar collapsed">
    <header class="sidebar-header">
      <a href="home" class="header-logo">
        <img src="@/assets/images/icone.svg" alt="logo">
      </a>
      <button ref="sidebarToggler" class="toggler sidebar-toggler">
        <span class="material-symbols-rounded">chevron_left</span>
      </button>
    </header>
    <nav class="sidebar-nav">
      <Navbar :items="navItems1" type="primary-nav" />
      <Navbar :items="navItems2" type="secondary-nav" @logout="logout" />
    </nav>
  </aside>
</template>

<script>
import Navbar from "../molecules/Navbar.vue";

export default {
  name: "SideMenu",
  components: {
    Navbar,
  },
  data() {
    return {
      navItems1: [
        { href: "home", icon: "home", label: "Accueil" },
        { href: "plats", icon: "skillet", label: "Plats" },
        { href: "stock", icon: "inventory", label: "Stock" },
      ],
      navItems2: [
        { href: "ajout", icon: "add", label: "Ajouter un plat" },
        { href: "#", icon: "logout", label: "Deconnexion" }, // Modifié href pour éviter la redirection immédiate
      ],
    };
  },
  mounted() {
    const sidebar = this.$refs.sidebar;
    const sidebarToggler = this.$refs.sidebarToggler;

    if (sidebarToggler && sidebar) {
      sidebarToggler.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
      });
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
@use "@/scss/layouts/Sidebar";
</style>