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
    import axios from "axios";
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
                items: []
            };
        },
        async mounted() {
            await this.fetchStock();
        },
        methods: {
            async fetchStock() {
                try {
                    // Récupérer la liste des ingrédients
                    const response = await axios.get("https://cuisine-qemt.onrender.com/api/ingredients");
                    let ingredients = response.data.map(ingredient => ({
                        id: ingredient.id, // On garde l'ID
                        imageSrc: ingredient.nom.toLowerCase().replace(/\s+/g, '-') + ".svg",
                        name: ingredient.nom,
                        numberServed: 0 // La quantité sera mise à jour après
                    }));

                    // Récupérer la quantité en stock de chaque ingrédient en parallèle
                    await Promise.all(ingredients.map(async (ingredient) => {
                        try {
                            const stockResponse = await axios.get(`https://cuisine-qemt.onrender.com/api/stock/etat/${ingredient.id}`);
                            ingredient.numberServed = stockResponse.data.quantiteDisponible || 0;
                        } catch (error) {
                            console.warn(`Pas de stock trouvé pour ${ingredient.name}`);
                        }
                    }));

                    this.items = ingredients;
                } catch (error) {
                    console.error("Erreur lors du chargement du stock :", error);
                }
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