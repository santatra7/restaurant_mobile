<template>
  <input
    class="base-input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: String,
    placeholder: String,
  },
};
</script>
<style lang="scss">
@use "@/scss/components/inputs" as *;
  .base-input {
    @include inputs();
    margin-bottom: 20px;
    width: 100%;
  }
</style>