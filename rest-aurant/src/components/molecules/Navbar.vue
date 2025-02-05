<template>
    <ul :class="['nav-list ', type]">
      <Icon 
        v-for="(item, index) in items" 
        :key="index"
        :href="item.href" 
        :icon="item.icon" 
        :label="item.label"
      />
    </ul>
</template>
  
<script>
  import Icon from "../atoms/Icon.vue";
  
  export default {
    name: "Navbar",
    components: {
      Icon,
    },
    props: {
      type: {
        type: String,
        default: "primary-nav",
      },
      items: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
  };
</script>
  
<style lang="scss">
</style>  