<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="email" />
    <h1>Créer <span>un bon plat.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container" id="stock">
        <div class="right" id="ingList">
            <ListAjout 
                :items="items.filter(item => item.selected)" 
                @remove="toggleIngredient"
            />
        </div>
        <div class="left" id="add">
            <h2>Ajout plat 🥣</h2>
            <div class="form">
                <BaseInput class="input" v-model="nom" placeholder="Nom du plat" type="text" />
                <BaseInput class="input" v-model="time" placeholder="Temps de preparation" type="time" />
                <BaseInput class="input" v-model="number" placeholder="Prix" type="number" />
                <ButtonPrimary class="button" @click="">Ajout plat</ButtonPrimary>
            </div>
            <IngredientsCarousel 
                :ingredients="items.filter(item => !item.selected)" 
                @select="toggleIngredient" 
            />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import SideMenu from "../components/organisms/SideMenu.vue";
    import PlatCard from "../components/molecules/Card.vue";
    import ListAjout from "../components/organisms/ListAjout.vue";
    import IngredientsCarousel from "../components/organisms/IngredientsCarousel.vue";
    import ButtonPrimary from "../components/atoms/Button.vue";
    import BaseInput from "../components/atoms/Input.vue";

    export default {
        name: "AjoutPlat",
        components: { SideMenu, BaseInput, PlatCard, ListAjout, ButtonPrimary, IngredientsCarousel },
        data() {
            return {
                items: []
            };
        },
        async mounted() {
            await this.fetchIngredients();
        },
        methods: {
            async fetchIngredients() {
                try {
                    const response = await axios.get("https://cuisine-qemt.onrender.com/api/ingredients");
                    this.items = response.data.map(ingredient => ({
                        imageSrc: ingredient.nom.toLowerCase().replace(/\s+/g, '-') + ".svg", 
                        name: ingredient.nom,
                        selected: false
                    }));
                } catch (error) {
                    console.error("Erreur lors du chargement des ingrédients :", error);
                }
            },
            toggleIngredient(ingredient) {
                ingredient.selected = !ingredient.selected;
            }
        }
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

    #add {
        @include card-background($card-background);
        border-radius: 20px;
        padding: 50px;
        height: 550px;
        margin-top: 130px;
        h2{
            color: $black-color;
            font-size: 40px;
            font-weight: 200;
            margin-bottom: 50px;
        }
        .form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
    }
    #ingList {
        margin: 0;
        height: 500px;
    }
</style>