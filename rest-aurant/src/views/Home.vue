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

        </footer>
    </main>
</template>

<script>
import Commandes from "@/components/pages/Commandes.vue";
import ButtonPrimary from "../components/atoms/Button.vue";
import Clients from "../components/pages/Clients.vue";

export default {
    name: "Home",
    components: { ButtonPrimary, Clients, Commandes },
    data() {
        return {
            commandes: [
                { user: "Alice Dupont", plat: "Spaghetti Carbonara" },
                { user: "Jean Martin", plat: "Pizza Margherita" },
                { user: "Sophie Durant", plat: "Salade César" },
                { user: "Paul Lefevre", plat: "Bœuf Bourguignon" },
                { user: "Emma Petit", plat: "Ratatouille" },
                { user: "Lucas Bernard", plat: "Poulet Basquaise" },
                { user: "Charlotte Robert", plat: "Coq au Vin" },
                { user: "Thomas Richard", plat: "Soupe à l'oignon" },
                { user: "Camille Moreau", plat: "Quiche Lorraine" },
                { user: "Antoine Laurent", plat: "Tarte Tatin" },
                { user: "Alice Dupont", plat: "Spaghetti Carbonara" },
                { user: "Jean Martin", plat: "Pizza Margherita" },
                { user: "Sophie Durant", plat: "Salade César" },
                { user: "Paul Lefevre", plat: "Bœuf Bourguignon" },
                { user: "Emma Petit", plat: "Ratatouille" },
                { user: "Lucas Bernard", plat: "Poulet Basquaise" },
                { user: "Charlotte Robert", plat: "Coq au Vin" },
                { user: "Thomas Richard", plat: "Soupe à l'oignon" },
                { user: "Camille Moreau", plat: "Quiche Lorraine" },
                { user: "Antoine Laurent", plat: "Tarte Tatin" },
            ],
            currentPage: 1,
            itemsPerPage: 12,
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
    methods: {
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
                height: 100px;
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
    }
}
</style>