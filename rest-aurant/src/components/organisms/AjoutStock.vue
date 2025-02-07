<template>
  <div class="ajout">
      <Select 
          v-model="selectedOption"
          :options="options"
          placeholder="Produit à ajouter"
      />
      <BaseInput class="input" v-model="number" placeholder="Nombre d'entré" type="number" />
      <BaseInput class="input" v-model="date" placeholder="Date de dépôt" type="date" />
      <ButtonPrimary class="button" @click="">Ajout Stock</ButtonPrimary>
  </div>
</template>

<script>
  import axios from "axios";
  import ButtonPrimary from "../atoms/Button.vue";
  import BaseInput from "../atoms/Input.vue";
  import Select from "../atoms/Select.vue";

  export default {
    name: "AjoutStock",
    components: {
      ButtonPrimary,
      BaseInput,
      Select
    },
    data() {
      return {
        number: "",
        date: "",
        selectedOption: null,
        options: []
      };
    },
    async mounted() {
      await this.fetchIngredients();
    },
    methods: {
      async fetchIngredients() {
        try {
          const response = await axios.get("https://cuisine-qemt.onrender.com/api/ingredients");
          this.options = response.data.map(ingredient => ({
            value: ingredient.id, 
            label: ingredient.nom
          }));
        } catch (error) {
          console.error("Erreur lors du chargement des ingrédients :", error);
        }
      }
    }
  };
</script>

<style lang="scss">
    .ajout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
</style>