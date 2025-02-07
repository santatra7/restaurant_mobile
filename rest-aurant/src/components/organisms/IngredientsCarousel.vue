<template>
  <div class="carousel-container">
    <button class="btn gauche" @click="scrollLeft" v-show="canScrollLeft">
      <span class="material-symbols-rounded">chevron_left</span>
    </button>

    <div class="carousel-wrapper">
      <div class="carousel" ref="carousel" @scroll="updateScrollPosition">
        <img 
          v-for="(ingredient, index) in ingredients" 
          :key="index" 
          :src="getImageSrc(ingredient.imageSrc)" 
          :alt="ingredient.name" 
          class="carousel-item"
          @click="$emit('select', ingredient)"
        />
      </div>
    </div>

    <button class="btn droite" @click="scrollRight" v-show="canScrollRight">
      <span class="material-symbols-rounded">chevron_right</span>
    </button>
  </div>
</template>

<script>
const images = import.meta.glob("../../assets/images/ingredients/*", { eager: true });

export default {
  name: "IngredientsCarousel",
  props: {
    ingredients: {
      type: Array,
      required: true,
      validator: (ingredients) =>
        ingredients.every(ing => ing.hasOwnProperty("imageSrc") && ing.hasOwnProperty("name")),
    },
  },
  data() {
    return {
      scrollPosition: 0,
      maxScroll: 0, // Pour stocker la largeur max de scroll
    };
  },
  computed: {
    canScrollLeft() {
      return this.scrollPosition > 0;
    },
    canScrollRight() {
      return this.scrollPosition < this.maxScroll;
    },
  },
  methods: {
    getImageSrc(imageName) {
      return images[`../../assets/images/ingredients/${imageName}`]?.default || null;
    },
    scrollLeft() {
      if (this.$refs.carousel) {
        this.$refs.carousel.scrollBy({ left: -200, behavior: "smooth" });
        setTimeout(this.updateScrollPosition, 300);
      }
    },
    scrollRight() {
      if (this.$refs.carousel) {
        this.$refs.carousel.scrollBy({ left: 200, behavior: "smooth" });
        setTimeout(this.updateScrollPosition, 300);
      }
    },
    updateScrollPosition() {
      if (this.$refs.carousel) {
        this.scrollPosition = this.$refs.carousel.scrollLeft;
        this.maxScroll = this.$refs.carousel.scrollWidth - this.$refs.carousel.clientWidth;
      }
    },
    updateMaxScroll() {
      this.$nextTick(() => {
        if (this.$refs.carousel) {
          this.maxScroll = this.$refs.carousel.scrollWidth - this.$refs.carousel.clientWidth;
          this.updateScrollPosition();
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.updateMaxScroll();
    }, 500); // On attend un peu pour s'assurer du rendu complet
    window.addEventListener("resize", this.updateMaxScroll);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateMaxScroll);
  }
};
</script>

<style lang="scss">
  @use "@/scss/layouts/carousel" as *;
</style>