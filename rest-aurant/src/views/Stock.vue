<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="text" />
    <h1>Stock <span>des ingredients.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container" id="stock">
        <div class="left" id="form">
            <h2>Ajout stock 🛒</h2>
            <AjoutStock class="form"></AjoutStock>
        </div>
        <div class="right">
            <!-- Afficher un Loading pendant que les ingrédients sont en cours de chargement -->
            <Loading v-if="loadingStock" />
            <ListIngredient :items="filteredItems" v-else />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import SideMenu from "../components/organisms/SideMenu.vue";
import BaseInput from "../components/atoms/Input.vue";
import ListIngredient from "../components/organisms/ListIngredient.vue";
import AjoutStock from "../components/organisms/AjoutStock.vue";
import Loading from "../components/atoms/Loading.vue"; // Ajouter le composant Loading

export default {
    name: "Stock",
    components: { SideMenu, BaseInput, ListIngredient, AjoutStock, Loading }, // Déclarer le composant Loading
    data() {
        return {
            items: [], // Liste complète des ingrédients
            search: "", // Texte de recherche
            loadingStock: false // Etat pour savoir si les ingrédients sont en chargement
        };
    },
    async mounted() {
        await this.fetchStock();
    },
    computed: {
        filteredItems() {
            if (!this.search.trim()) {
                return this.items; // Si la recherche est vide, on retourne tous les items
            }

            const searchTerm = this.normalizeText(this.search);

            // On filtre les ingrédients en fonction de la recherche
            return this.items.filter(ingredient =>
                this.normalizeText(ingredient.name).includes(searchTerm)
            );
        }
    },
    methods: {
        async fetchStock() {
            this.loadingStock = true; // Activer le chargement au début

            try {
                const response = await axios.get("https://cuisine-qemt.onrender.com/api/ingredients");

                let ingredients = response.data.map(ingredient => ({
                    id: ingredient.id,
                    imageSrc: ingredient.nom.toLowerCase().replace(/\s+/g, '-') + ".svg",
                    name: ingredient.nom,
                    numberServed: 0 
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

                this.items = ingredients; // Mise à jour de la liste des ingrédients
            } catch (error) {
                console.error("Erreur lors du chargement du stock :", error);
            } finally {
                this.loadingStock = false; // Désactiver le chargement après la récupération des ingrédients
            }
        },
        normalizeText(text) {
            return text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
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