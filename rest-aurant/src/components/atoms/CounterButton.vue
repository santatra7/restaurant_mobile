<template>
    <div class="counter">
      <button @click="decrement" :disabled="modelValue <= 0">−</button>
      <span>{{ modelValue }}</span>
      <button @click="increment">+</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "CounterButton",
    data() {
      return {
        modelValue: 1, // Valeur initiale
      };
    },
    methods: {
      increment() {
        this.modelValue += 1; // Incrémente la valeur
      },
      decrement() {
        if (this.modelValue > 1) {
          this.modelValue -= 1; // Décrémente la valeur
        }
      },
    },
  };
  </script>
  
<style lang="scss">
  .counter {
    display: flex;
    align-items: center;
    gap: 10px;
    button {
        @include nav-button();
        @include dimension(30px, 30px);
    }
    span {
      font-size: 15px;
      font-weight: 400;
    }
  }
</style>  