<template>
  <div class="ingredient-card">
    <button class="delete-button" @click="$emit('delete')">
      <span class="material-symbols-rounded">delete</span>
    </button>

    <figure id="plats">
      <img v-if="computedImageSrc" :src="computedImageSrc" :alt="name" />
      <img v-else src="../../assets/images/ingredients/default.jpg" alt="Image par défaut" />
    </figure>

    <div class="text">
      <h2 id="h2">{{ name }}</h2>
      <CounterButton class="counter" :modelValue="numberServed" @update="updateIngredientQuantity" />
    </div>
  </div>
</template>

<script>
import CounterButton from "../atoms/CounterButton.vue";

const images = import.meta.glob("../../assets/images/ingredients/*", { eager: true });
export default {
  name: "AjouIng",
  components: { CounterButton },
  props: {
    imageSrc: String,
    name: String,
    numberServed: {
      type: Number,
      default: 0 // Valeur par défaut si non définie
    },
  },
  computed: {
    computedImageSrc() {
      return images[`../../assets/images/ingredients/${this.imageSrc}`]?.default || null;
    },
  },
  methods: {
    updateIngredientQuantity(newQuantity) {
      this.$emit('updateQuantity', newQuantity); // Emit the updated quantity to the parent
    }
  }
};
</script>
  
<style lang="scss">
  @use "@/scss/components/plats" as *;
  .ingredient-card {
    @include card-design($card-background-dark2);
    #h2{
        margin-left: -10px;
        margin-top: 30px;
        font-size: 30px;
    }

    .delete-button{
        color: $primary-color;
        @include align-item();
        border: 0;
        border-radius: 8px;
        padding: 8px;
        text-decoration: none;
        background: transparent;
        cursor: pointer;
        @include dimension(40px, 40px);
        @include position-absolute(auto, auto, auto, 475px, auto);
        &:hover {
            box-shadow: $card-background-hover;
            color: $black-color;
        }
    }

    .counter {
        @include position-absolute(auto, auto, 20px, 420px, auto);
    }
  }
</style>  