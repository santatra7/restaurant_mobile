<template>
    <article>
        <figure>
            <img v-if="computedImageSrc" :src="computedImageSrc" :alt="name" />
            <!-- <img v-else src="../../assets/images/plats/default.jpg" alt="Image par défaut" /> -->
        </figure>
        <div class="text">
            <h2>{{ name }}</h2>
            <p>{{ prix }} <span>  🪙</span></p>
        </div>
    </article>
</template>

<script>
const images = import.meta.glob("../../assets/images/plats/*", { eager: true });

export default {
  name: "PlatCard",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    prix: {
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