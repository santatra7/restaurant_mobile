<template>
  <div class="counter">
    <button @click="decrement" :disabled="modelValue <= 1">−</button>
    <span>{{ modelValue }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  name: "CounterButton",
  props: {
    modelValue: {
      type: Number,
      required: true,
      default: 1 // Valeur par défaut si non définie
    }
  },
  methods: {
    increment() {
      this.$emit('update', this.modelValue + 1); // Incrementer la valeur et émettre
    },
    decrement() {
      if (this.modelValue > 0) {
        this.$emit('update', this.modelValue - 1); // Decrementer la valeur et émettre
      }
    }
  }
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