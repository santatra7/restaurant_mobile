<template>
  <section class="list-ingredients">
    <!-- Message affiché si la liste est vide -->
    <div v-if="items.length === 0" class="empty-message">
      <img src="@/assets/images/lady.gif" alt="Aucun ingrédient" class="empty-image">
      <p>Ajoutez des ingrédients pour composer votre plat ! 🍽️</p>
    </div>

    <!-- Liste des ingrédients -->
    <AjoutIng
      v-else
      class="fille"
      v-for="(item, index) in items"
      :key="index"
      :imageSrc="item.imageSrc"
      :name="item.name"
      :numberServed="item.quantity" 
      @delete="$emit('remove', item)"
      @updateQuantity="updateQuantity(index, $event)"
    />
  </section>
</template>

<script>
import AjoutIng from "../molecules/AjoutIng.vue";
export default {
  name: "ListAjout",
  components: { AjoutIng },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    removeIngredient(index) {
      this.items.splice(index, 1);
    },
    updateQuantity(index, quantity) {
      if (typeof quantity === "number") {
        this.items[index].quantity = quantity; // Mettre à jour la quantité dans l'élément
      }
    },
  },
};
</script>
  
  <style lang="scss">
    @use "@/scss/layouts/liste" as *;
    .list-ingredients {
        @include list(80vh);
    }
    .empty-message {
      position: relative;
      img {
        width: 600px;
        margin-right: 100px;
      }
      p{
        color: $primary-color;
        font-size: 40px;
        width: 65%;
        @include position-absolute(auto, 390px, auto, auto, auto);
      }
    }
  </style>  