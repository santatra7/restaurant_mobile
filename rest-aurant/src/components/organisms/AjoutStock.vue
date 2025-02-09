<template>
  <div class="ajout">
    <Select 
        v-model="selectedOption"
        :options="options"
        placeholder="Produit à ajouter"
    />
    <BaseInput class="input" v-model="number" placeholder="Nombre d'entré" type="number" />
    <BaseInput class="input" v-model="date" placeholder="Date de dépôt" type="date" />
    <ButtonPrimary 
        class="button" 
        @click="ajouterStock" 
        :disabled="isSubmitting"
    >
        Ajout Stock
    </ButtonPrimary>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
      options: [],
      errorMessage: "",
      successMessage: "",
      isSubmitting: false // Indicateur de soumission
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
        this.errorMessage = "Impossible de charger les ingrédients.";
      }
    },
    async ajouterStock() {
      // Si une soumission est déjà en cours, on évite d'envoyer à nouveau
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true; // Définir l'état de soumission à true
      this.errorMessage = "";
      this.successMessage = "";

      if (!this.selectedOption || !this.number || !this.date) {
        this.errorMessage = "Veuillez remplir tous les champs.";
        this.isSubmitting = false; // Réinitialiser l'état de soumission si des champs sont manquants
        return;
      }

      try {
        const response = await axios.post("https://cuisine-qemt.onrender.com/api/stock/add", {
          idIngredient: this.selectedOption,
          quantite: parseInt(this.number),
          dt: this.date
        });

        if (response.status === 201) {
          this.successMessage = "Stock ajouté avec succès !";
          this.number = "";
          this.date = "";
          this.selectedOption = null;
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du stock :", error);
        this.errorMessage = "Une erreur s'est produite lors de l'ajout du stock.";
      } finally {
        this.isSubmitting = false; // Réinitialiser l'état de soumission après la tentative
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
    .error-message {
      color: $secondary-color;
      margin-top: 10px;
    }
    .success-message {
      color: rgb(48, 53, 213);
      margin-top: 10px;
    }
</style>