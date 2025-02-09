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
    import axios from "axios";
    import SideMenu from "../components/organisms/SideMenu.vue";
    import BaseInput from "../components/atoms/Input.vue";
    import Charts from "../components/organisms/Charts.vue";
    import ListPlats from "../components/organisms/ListePlats.vue";

    export default {
        name: "HomeAdmin",
        components: { SideMenu, BaseInput, Charts, ListPlats },
        data() {
            return {
                sales: {}, // Données des ventes par date
                items: [] // Liste des plats avec le nombre de commandes
            };
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

                    // Appliquer la boucle sur les images (1.svg à 4.svg)
                    this.items = response.data.map((plat, index) => ({
                        imageSrc: `${(index % 4) + 1}.svg`, // Boucle sur 1 à 4
                        name: plat.nomPlat,
                        numberServed: plat.commande
                    }));
                } catch (error) {
                    console.error("Erreur lors du chargement des plats commandés :", error);
                }
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