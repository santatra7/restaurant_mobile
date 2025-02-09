<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="text" />
    <h1>Plats <span>existant.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container" id="plats">
        <div class="plats-cards-container">
            <!-- Afficher un Loading pendant que les plats sont en cours de chargement -->
            <Loading v-if="loadingPlats" />
            
            <PlatCard
              v-for="(item, index) in currentItems" 
              :key="index"
              :imageSrc="item.imageSrc"
              :name="item.name"
              :prix="item.prix"
            />
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <button 
              v-for="page in totalPages" 
              :key="page"
              :class="['pagination-button', { 'active': currentPage === page }]"
              @click="goToPage(page)">
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import SideMenu from "../components/organisms/SideMenu.vue";
import BaseInput from "../components/atoms/Input.vue";
import PlatCard from "../components/molecules/Card.vue";
import Loading from "../components/atoms/Loading.vue";  // Ajouter le composant Loading

export default {
    name: "Plats",
    components: { SideMenu, BaseInput, PlatCard, Loading },  // Déclarer le composant Loading
    data() {
        return {
            items: [], // Liste complète des plats
            search: "", // Texte de recherche
            currentPage: 1,
            itemsPerPage: 8,
            loadingPlats: false // Etat pour savoir si les plats sont en chargement
        };
    },
    async mounted() {
        await this.fetchPlats();
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
        },
        totalPages() {
            return Math.ceil(this.filteredPlats.length / this.itemsPerPage);
        },
        currentItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredPlats.slice(startIndex, startIndex + this.itemsPerPage);
        }
    },
    methods: {
        async fetchPlats() {
            this.loadingPlats = true; // Activer le chargement au début

            try {
                const response = await axios.get("https://cuisine-qemt.onrender.com/api/plats");

                let plats = response.data.map((plat, index) => ({
                    id: plat.id, 
                    imageSrc: `${(index % 4) + 1}.svg`,
                    name: plat.nom,
                    prix: ""  
                }));

                // Récupérer les prix pour chaque plat en parallèle
                await Promise.all(plats.map(async (plat) => {
                    try {
                        const prixResponse = await axios.get(`https://cuisine-qemt.onrender.com/api/plat/${plat.id}/prix`);
                        plat.prix = prixResponse.data.montant || "";
                    } catch (error) {
                        console.warn(`Pas de prix trouvé pour ${plat.name}`);
                    }
                }));

                this.items = plats;
            } catch (error) {
                console.error("Erreur lors du chargement des plats :", error);
            } finally {
                this.loadingPlats = false; // Désactiver le chargement après la récupération des plats
            }
        },
        goToPage(page) {
            this.currentPage = page;
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

    .home-admin-container#plats {
        @include card-background($card-background);
        padding: 3rem;
        border-radius: 20px;
        box-shadow: $box-shadow;
        display: flex;
        animation: fadeIn 0.6s ease-out forwards;
        .plats-cards-container {
            @include plat-card();
        }
    }

    .pagination {
        @include verical-pagination();
    }
</style>