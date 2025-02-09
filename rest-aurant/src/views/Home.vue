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
            <Clients/>
        </section>
        <section class="n3">
            <div class="commande-cards-container">
                <Commandes
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
        </section>
    </main>
</template>

<script>
import Commandes from "@/components/pages/Commandes.vue";
import ButtonPrimary from "../components/atoms/Button.vue";
import Clients from "../components/pages/Clients.vue";

export default {
    name: "Home",
    components: { ButtonPrimary, Clients, Commandes },
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

    .n3 {
        @include card-background($card-background);
        margin: 150px 100px;
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
        }
    }

    .pagination {
        @include verical-pagination();
    }
}
</style>