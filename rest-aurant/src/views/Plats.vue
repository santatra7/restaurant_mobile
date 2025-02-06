<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="email" />
    <h1>Plats <span>existant.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container" id="plats">
        <div class="plats-cards-container">
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
    import SideMenu from "../components/organisms/SideMenu.vue";
    import BaseInput from "../components/atoms/Input.vue";
    import PlatCard from "../components/molecules/Card.vue";

    export default {
        name: "Plats",
        components: { SideMenu, BaseInput, PlatCard },
        data() {
            return {
                items: [
                    { imageSrc: "pattes.svg", name: "Pattes mlay be tsy misy ohatrany zany", prix: 400 },
                    { imageSrc: "poulet.svg", name: "Poulet", prix: 400 },
                    { imageSrc: "riz.svg", name: "Vary mlay", prix: 400 },
                    { imageSrc: "soupe.svg", name: "Lasoupy", prix: 400 },
                    { imageSrc: "pattes.svg", name: "Tsy aiko intsony", prix: 400 },
                    { imageSrc: "poulet.svg", name: "Poulet", prix: 400 },
                    { imageSrc: "riz.svg", name: "Vary mlay", prix: 400 },
                    { imageSrc: "soupe.svg", name: "Lasoupy", prix: 400 },
                    { imageSrc: "pattes.svg", name: "Pattes mlay be tsy misy ohatrany zany", prix: 400 },
                    { imageSrc: "poulet.svg", name: "Poulet", prix: 400 },
                    { imageSrc: "riz.svg", name: "Vary mlay", prix: 400 },
                    { imageSrc: "soupe.svg", name: "Lasoupy", prix: 400 },
                    { imageSrc: "pattes.svg", name: "Tsy aiko intsony", prix: 400 },
                    { imageSrc: "poulet.svg", name: "Poulet", prix: 400 },
                    { imageSrc: "riz.svg", name: "Vary mlay", prix: 400 },
                    { imageSrc: "soupe.svg", name: "Lasoupy", prix: 400 },
                    { imageSrc: "pattes.svg", name: "Pattes  zany", prix: 400 },
                    { imageSrc: "poulet.svg", name: "Poulet", prix: 400 },
                    { imageSrc: "riz.svg", name: "Vary mlay", prix: 400 },
                    { imageSrc: "soupe.svg", name: "Lasoupy", prix: 400 },
                    { imageSrc: "pattes.svg", name: "Tsy aiko intsony", prix: 400 },
                    { imageSrc: "poulet.svg", name: "Poulet", prix: 400 },
                    { imageSrc: "riz.svg", name: "Vary mlay", prix: 400 },
                    { imageSrc: "soupe.svg", name: "Lasoupy", prix: 400 },
                ],
                currentPage: 1,
                itemsPerPage: 8
            };
        },
        computed: {
            totalPages() {
                return Math.ceil(this.items.length / this.itemsPerPage);
            },
            currentItems() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                return this.items.slice(startIndex, startIndex + this.itemsPerPage);
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