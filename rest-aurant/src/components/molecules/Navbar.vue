<template>
  <ul :class="['nav-list', type]">
    <li v-for="(item, index) in items" :key="index">
      <a
        :href="item.href"
        @click.prevent="handleClick(item)"
      >
        <Icon :icon="item.icon" :label="item.label" />
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from "../atoms/Icon.vue";

export default {
  name: "Navbar",
  components: { Icon },
  props: {
    type: { type: String, default: "primary-nav" },
    items: { type: Array, required: true, default: () => [] },
  },
  methods: {
    handleClick(item) {
      if (item.label === "Deconnexion") {
        this.$emit("logout"); // Émet l'événement "logout" vers SideMenu.vue
      } else {
        this.$router.push(item.href); // Navigation normale
      }
    },
  },
};
</script>
  
<style lang="scss">
</style>  