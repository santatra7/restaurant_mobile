<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="text" />
    <h1>Home<span>page.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container">
        <div class="left">
            <Charts :salesData="sales"></Charts>
        </div>
        <div class="right">
            <!-- Affichage du composant Loading si les plats sont en cours de chargement -->
            <Loading v-if="isLoading" />
            <!-- Affichage de la liste des plats quand le chargement est terminé -->
            <ListPlats v-else :items="filteredPlats" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import SideMenu from "../components/organisms/SideMenu.vue";
import BaseInput from "../components/atoms/Input.vue";
import Charts from "../components/organisms/Charts.vue";
import ListPlats from "../components/organisms/ListePlats.vue";
import Loading from "../components/atoms/Loading.vue";

export default {
    name: "HomeAdmin",
    components: { SideMenu, BaseInput, Charts, ListPlats, Loading },
    data() {
        return {
            sales: {}, // Données des ventes par date
            items: [], // Liste complète des plats
            search: "", // Texte de recherche
            isLoading: true, // État de chargement des plats
        };
    },
    computed: {
        filteredPlats() {
            if (!this.search.trim()) {
                return this.items;
            }

            const searchTerm = this.normalizeText(this.search);

            return this.items.filter(plat =>
                this.normalizeText(plat.name).includes(searchTerm)
            );
        }
    },
    async mounted() {
        await this.fetchSales();
        await this.fetchPlatsCommandes();
    },
    methods: {
        async fetchSales() {
            try {
                const response = await axios.get("https://cuisine-qemt.onrender.com/api/commandes/par-jour");
                this.sales = response.data.reduce((acc, sale) => {
                    acc[sale.jour] = sale.nombre;
                    return acc;
                }, {});
            } catch (error) {
                console.error("Erreur lors du chargement des ventes :", error);
            }
        },
        async fetchPlatsCommandes() {
            try {
                const response = await axios.get("https://cuisine-qemt.onrender.com/api/detailsCommande/countPlats");

                this.items = response.data.map((plat, index) => ({
                    imageSrc: `${(index % 4) + 1}.svg`, // Boucle sur 1 à 4
                    name: plat.nomPlat,
                    numberServed: plat.commande
                }));

                // Une fois les données chargées, on passe l'état de chargement à false
                this.isLoading = false;
            } catch (error) {
                console.error("Erreur lors du chargement des plats commandés :", error);
                // En cas d'erreur, on arrête aussi le chargement
                this.isLoading = false;
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