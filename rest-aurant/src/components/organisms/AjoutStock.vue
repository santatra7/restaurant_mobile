<template>
    <div class="ajout">
        <Select 
            v-model="selectedOption"
            :options="[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
            ]"
            placeholder="Produit à ajouter"
        />
        <BaseInput class="input" v-model="number" placeholder="Nombre d'entré" type="number" />
        <BaseInput class="input" v-model="date" placeholder="Date de depot" type="date" />
        <ButtonPrimary class="button" @click="">Ajout Stock</ButtonPrimary>
    </div>
</template>

<script>
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
    };
  },
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