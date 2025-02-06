<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="email" />
    <h1>Home<span>page.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container">
        <div class="left">
            <Charts :salesData="sales"></Charts>
        </div>
        <div class="right">
            <ListPlats :items="items"></ListPlats>
        </div>
    </div>
</template>

<script>
    import SideMenu from "../components/organisms/SideMenu.vue";
    import BaseInput from "../components/atoms/Input.vue";
    import Charts from "../components/organisms/Charts.vue";
    import ListPlats from "../components/organisms/ListePlats.vue";

    export default {
        name: "HomeAdmin",
        components: { SideMenu, BaseInput, Charts, ListPlats },
        data() {
            return {
                sales: {
                    "2025-02-01": 500,
                    "2025-02-02": 700,
                    "2025-02-03": 450,
                    "2025-02-04": 620,
                    "2025-02-05": 800,
                    "2025-02-06": 300,
                    "2025-02-07": 1000,
                    "2025-02-08": 900,
                    "2025-02-09": 650,
                },
                items: [
                    { imageSrc: "pattes.svg", name: "Pattes mlay be tsy misy ohatrany zany", numberServed: 400 },
                    { imageSrc: "poulet.svg", name: "poulet", numberServed: 400 },
                    { imageSrc: "riz.svg", name: "vary mlay", numberServed: 400 },
                    { imageSrc: "soupe.svg", name: "lasoupy", numberServed: 400 },
                    { imageSrc: "pattes.svg", name: "Tsy aiko intsony", numberServed: 400 },
                    { imageSrc: "poulet.svg", name: "poulet", numberServed: 400 },
                    { imageSrc: "riz.svg", name: "vary mlay", numberServed: 400 },
                    { imageSrc: "soupe.svg", name: "lasoupy", numberServed: 400 },
                ]
            };
        },
    };
</script>


<style lang="scss">
    @use "@/scss/layouts/homeAdmin" as *;
    body {
        @include background-image($background-images);
        position: relative;
    }
    .search {
        @include position-absolute(auto, 40px, auto, calc(100% / 2), auto);
        width: 30%;
    }
    h1 {
        @include titre1();
    }
</style>