<template>
  <section class="list-plats">
      <Ingredients
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
import Ingredients from "../molecules/Ingredients.vue";

export default {
name: "ListIngredients",
components: {
  Ingredients,
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