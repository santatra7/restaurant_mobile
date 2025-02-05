<template>
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎 Rechercher par ici" type="email" />
</template>

<script>
    import SideMenu from "../components/organisms/SideMenu.vue";
    import BaseInput from "../components/atoms/Input.vue";

    export default {
        name: "HomeAdmin",
        components: {
            SideMenu,
            BaseInput,
        },
    };
</script>

<style lang="scss">
    body {
        @include background-image($background-images);
        position: relative;
    }
    .search {
        @include position-absolute(auto, 40px, auto, calc(100% / 2), auto);
        width: 30%;
    }
</style>