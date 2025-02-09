<template>
    <div class="title">
        <h3>Notre Engagement envers Nos Clients</h3>
        <p>Chez REST aurant, nous plaçons nos clients au 
            cœur de tout ce que nous faisons. Chaque visite, 
            chaque commande et chaque interaction comptent pour nous. 
            C'est pourquoi nous nous engageons à offrir une expérience 
            culinaire exceptionnelle, du premier clic sur notre 
            site jusqu'à la dernière bouchée de votre plat.</p>
    </div>
    <div class="clients">
        <Client
          v-for="(item, index) in items" 
          :key="index"
          :nom="item.nom"
          :pseudo="item.pseudo"
          :mail="item.mail"
        />
    </div>
</template>

<script>
    import axios from "axios";
    import Client from "../molecules/Client.vue";

    export default {
        name: "Clients",
        components: { Client },
        data() {
            return {
                items: [] // Initialement vide, sera rempli avec les données de l'API
            };
        },
        async mounted() {
            await this.fetchClients();
        },
        methods: {
            async fetchClients() {
                try {
                    const response = await axios.get("https://cuisine-qemt.onrender.com/api/utilisateur");
                    this.items = response.data.map(client => ({
                        nom: client.nom,
                        pseudo: client.nomUtilisateur,
                        mail: client.mail
                    }));
                } catch (error) {
                    console.error("Erreur lors du chargement des clients :", error);
                }
            }
        }
    };
</script>

<style lang="scss">
    @use "@/scss/layouts/liste" as *;
    .title {
        @include dimension(60%, 100%);
        align-items: center;
        padding: 70px;
        color: $primary-color;
        animation: appear linear;
        animation-timeline: view();
        animation-range: entry 0% cover 40%;
        h3 {
            width: 80%;
            font-size: 50px;
            margin-bottom: 40px;
        }
        p {
            width: 90%;
        }
    }

    .clients {
        @include dimension(38%, 100%);
        @include list(80vh);
        height: 500px;
        animation: appear linear;
        animation-timeline: view();
        animation-range: entry 0% cover 40%;
    }
</style>