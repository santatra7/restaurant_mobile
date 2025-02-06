<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="email" />
    <h1>Stock <span>des ingredients.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container" id="stock">
        <div class="left" id="form">
            <h2>Ajout stock 🛒</h2>
            <AjoutStock class="form"></AjoutStock>
        </div>
        <div class="right">
            <ListIngredient :items="items"></ListIngredient>
        </div>
    </div>
</template>

<script>
    import SideMenu from "../components/organisms/SideMenu.vue";
    import BaseInput from "../components/atoms/Input.vue";
    import PlatCard from "../components/molecules/Card.vue";
    import ListIngredient from "../components/organisms/ListIngredient.vue";
    import AjoutStock from "../components/organisms/AjoutStock.vue";

    export default {
        name: "Stock",
        components: { SideMenu, BaseInput, PlatCard, ListIngredient, AjoutStock },
        data() {
            return {
                items: [
                    { imageSrc: "bouillon.svg", name: "bouillon", numberServed: 400 },
                    { imageSrc: "charcuterie.svg", name: "charcuterie", numberServed: 100 },
                    { imageSrc: "riz.svg", name: "riz", numberServed: 40 },
                    { imageSrc: "fromage.svg", name: "fromage", numberServed: 50 },
                    { imageSrc: "oeuf.svg", name: "oeuf", numberServed: 0 },
                    { imageSrc: "oignon.svg", name: "oignon", numberServed: 500 },
                    { imageSrc: "pain.svg", name: "pain", numberServed: 0 },
                ]
            };
        },
    };
</script>


<style lang="scss">
    @use "@/scss/layouts/homeAdmin" as *;
    @use "@/scss/layouts/liste" as *;
    @use "@/scss/components/pagination" as *;

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

    #form {
        @include card-background($card-background);
        border-radius: 20px;
        padding: 50px;
        margin-top: 20px;
        h2{
            color: $black-color;
            font-size: 40px;
            font-weight: 200;
            margin-bottom: 70px;
        }
    }
</style>