<template>
  <section class="list-plats">
      <Plat
          class="fille"
          v-for="(item, index) in items" 
          :key="index"
          :imageSrc="item.imageSrc"
          :name="item.name"
          :numberServed="item.numberServed"
      />
  </section>
</template>

<script>
import Plat from "../molecules/Plats.vue";

export default {
name: "ListPlats",
components: {
  Plat,
},
props: {
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
},
};
</script>

<style lang="scss">
  @use "@/scss/layouts/liste" as *;
  .list-plats {
    @include list(80vh);
  }
</style>