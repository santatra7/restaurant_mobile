<template>
    <main>
        <div class="home-container">
            <header>
                <h2><span>Front</span>office.</h2>
                <menu></menu>
                <ButtonPrimary class="button" @click="$router.push('/login')">Se connecter</ButtonPrimary>
            </header>
            
            <section class="n1">
                <img class="floating-image img1" src="../assets/images/ingredients/carotte.svg" alt="">
                <img class="floating-image img2 blur" src="../assets/images/ingredients/fromage.svg" alt="">
                <img class="floating-image img3" src="../assets/images/ingredients/courgette.svg" alt="">
                <img class="floating-image img4 blur" src="../assets/images/ingredients/pain.svg" alt="">
                <img class="floating-image img5" src="../assets/images/ingredients/haricot-vert.svg" alt="">
                <img class="logo" src="../assets/images/logo.svg" alt="">
            </section>
        </div>

        <section class="n2">
            <Clients />
        </section>

        <h2 class="hh">Liste des commandes en cours</h2>
        <section class="n3">
            <div class="commande-cards-container">
                <Loading v-if="isLoading" />
                <Commandes
                    v-for="(item, index) in currentItems" 
                    :key="index"
                    :user="item.user"
                    :plat="item.plat"
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
        </section>

        <footer>
            <p> 2929
                2686
                2674
                2824</p>
        </footer>
    </main>
</template>

<script>
import axios from "axios";
import Commandes from "@/components/pages/Commandes.vue";
import ButtonPrimary from "../components/atoms/Button.vue";
import Clients from "../components/pages/Clients.vue";
import Loading from "../components/atoms/Loading.vue";

export default {
    name: "Home",
    components: { ButtonPrimary, Clients, Commandes, Loading },
    data() {
        return {
            commandes: [],
            currentPage: 1,
            itemsPerPage: 12,
            isLoading: true,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.commandes.length / this.itemsPerPage);
        },
        currentItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.commandes.slice(start, start + this.itemsPerPage);
        }
    },
    async mounted() {
        await this.fetchCommandes();
    },
    methods: {
        async fetchCommandes() {
            try {
                // Récupérer les commandes
                const response = await axios.get("https://cuisine-qemt.onrender.com/api/commande/simpleDetails");
                const commandes = response.data;

                // Récupérer les plats pour chaque commande
                const commandesAvecPlats = await Promise.all(commandes.map(async (commande) => {
                    const platsNoms = await Promise.all(commande.idPlats.map(async (idPlat) => {
                        const platResponse = await axios.get(`https://cuisine-qemt.onrender.com/api/plat/${idPlat}`);
                        return platResponse.data[0]?.nom || "Plat inconnu";
                    }));

                    return {
                        user: commande.nomUtilisateur,
                        plat: platsNoms.join(", ")
                    };
                }));

                this.commandes = commandesAvecPlats;
                this.isLoading = false;
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes :", error);
            }
        },
        goToPage(page) {
            this.currentPage = page;
        }
    }
};
</script>

<style lang="scss">
@use "@/scss/layouts/liste" as *;
@use "@/scss/components/pagination" as *;
main {
    @include background-image-gradient($sky);
    .home-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: relative;

        header {
            @include position-absolute(auto, 70px, auto, auto, auto);
            display: flex;
            align-items: center;
            position: fixed;
            z-index: 999999999999999;

            .button {
                @include position-absolute(auto, auto, auto, 500px, auto);
                width: 210px;
            }

            h2 {
                @include titre2();
            }
        }

        .n1 {
            position: relative;
            animation: appear linear;
            animation-timeline: view();
            animation-range: entry 0% cover 40%;

            .logo {
                width: 800px;
                z-index: 2;
                position: relative;
            }

            .floating-image {
                @include floatingImage();
            }
        }
    }
    .n2 {
        margin: 50px 100px;
        height: 80vh;
        outline: none;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
    }


    .hh {
        margin: 0 100px;
        @include titre2();
    }
    .n3 {
        @include card-background($card-background);
        margin: 0 100px;
        height: 80vh;
        padding: 3rem;
        border-radius: 20px;
        box-shadow: $box-shadow;
        display: flex;
        animation: appear linear;
        animation-timeline: view();
        animation-range: entry 0% cover 40%;
        .commande-cards-container {
            @include plat-card();
            article {
                height: 120px;
                .text {
                    margin: 0;
                }
            }
        }
    }

    .pagination {
        @include verical-pagination();
    }

    footer {
        @include dimension(100%, 200px);
        background: $card-background;
        margin-top: 200px;
        p {
            color: $secondary-color;
            margin: 20px 100px;
            font-size: 20px;
        }
    }
}
</style>