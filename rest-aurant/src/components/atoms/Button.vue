<template>
  <div class="button" @click="$emit('click')">
    <div class="button__content">
      <div class="button__text">
        <slot></slot>
      </div>
      
      <div class="button__reflection-1"></div>
      <div class="button__reflection-2"></div>
    </div>

    <img src="../../assets/images/star.png" alt="" class="button__star-1">
    <img src="../../assets/images/star.png" alt="" class="button__star-2">
    <img src="../../assets/images/circle.png" alt="" class="button__circle-1">
    <img src="../../assets/images/circle.png" alt="" class="button__circle-2">
    <img src="../../assets/images/diamond.png" alt="" class="button__diamond">
    <img src="../../assets/images/triangle.png" alt="" class="button__triangle">
    
    <div class="button__shadow"></div>
  </div>
</template>

<script>
export default {
  name: "ButtonPrimary",
};
</script>

<style lang="scss">
  @use "@/scss/components/button" as *;
  .button{
    @include button-primary();
  }
</style>