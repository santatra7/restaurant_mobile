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
    </main>
</template>

<script>
import ButtonPrimary from "../components/atoms/Button.vue";
import Clients from "../components/pages/Clients.vue";

export default {
    name: "Home",
    components: { ButtonPrimary, Clients },
};
</script>

<style lang="scss">
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
            animation: fadeIn 0.6s ease-out forwards;

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
        margin: 0 100px;
        height: 80vh;
        outline: none;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
    }
}
</style>