<template>
  <div class="plats">
    <figure id="plats">
      <img v-if="computedImageSrc" :src="computedImageSrc" :alt="name" />
      <img v-else src="../../assets/images/plats/default.jpg" alt="Image par défaut" />
    </figure>
    <div class="text">
      <h2>{{ name }}</h2>
      <p>{{ numberServed }} <span>  plats servis</span></p>
    </div>
  </div>
</template>

<script>
const images = import.meta.glob("../../assets/images/plats/*", { eager: true });

export default {
  name: "Plat",
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
      return images[`../../assets/images/plats/${this.imageSrc}`]?.default || null;
    },
  },
};
</script>

<style lang="scss">
  @use "@/scss/components/plats" as *;
  .plats {
    @include card-design($card-background-dark2);
  }
</style>