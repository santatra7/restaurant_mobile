<template>
  <div class="ingredients" :class="{ 'out-of-stock': numberServed === 0 }">
    <figure id="plats">
      <img v-if="computedImageSrc" :src="computedImageSrc" :alt="name" />
      <!-- <img v-else src="../../assets/images/ingredients/default.jpg" alt="Image par défaut" /> -->
    </figure>
    <div class="text">
      <h2>{{ name }}</h2>
      <p><span>Etat de stock  : </span>{{ numberServed }}</p>
    </div>
  </div>
</template>

<script>
const images = import.meta.glob("../../assets/images/ingredients/*", { eager: true });

export default {
  name: "Ingredients",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    numberServed: {
      type: Number,
      required: true,
    },
  },
  computed: {
    computedImageSrc() {
      return images[`../../assets/images/ingredients/${this.imageSrc}`]?.default || null;
    },
  },
};
</script>

<style lang="scss">
  @use "@/scss/components/plats" as *;
  .ingredients {
    @include card-design($card-background);
    figure {
      top: 2px;
    }
    .text{
      color: $black-color;
      h2 {
        font-size: 30px;
      }
      p {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
  .out-of-stock {
    @include card-design($card-background-error);
    box-shadow: $card-background-hover;
  }
</style>