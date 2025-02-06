<template>
    <select
      class="base-select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </template>
  
  <script>
  export default {
    name: "Select",
    props: {
      modelValue: String,
      options: {
        type: Array,
        required: true,
        validator: (options) =>
          options.every(opt => opt.hasOwnProperty('value') && opt.hasOwnProperty('label')),
      },
      placeholder: String,
    },
  };
  </script>
  
  <style lang="scss">
  @use "@/scss/components/inputs" as *;
  
  .base-select {
    @include inputs();
    margin-bottom: 20px;
    width: 100%;
    appearance: none; /* Supprime le style natif */
    background-size: 12px; /* Icône pour la flèche vers le bas */
    padding-right: 30px; /* Ajoute de l'espace pour l'icône */
  }
  </style>  