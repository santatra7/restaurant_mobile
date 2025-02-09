Avec cette page 

<template>
    <!-- HEADERS -->
    <SideMenu></SideMenu>
    <BaseInput class="search" v-model="search" placeholder="🔎   Rechercher par ici" type="email" />
    <h1>Créer <span>un bon plat.</span></h1>

    <!-- BODY -->
    <div class="home-admin-container" id="stock">
        <div class="right" id="ingList">
            <!-- Affiche les ingrédients sélectionnés -->
            <ListAjout 
                :items="items.filter(item => item.selected)" 
                @remove="toggleIngredient"
            />
        </div>
        <div class="left" id="add">
            <h2>Ajout plat 🥣</h2>
            <div class="form">
                <BaseInput class="input" v-model="nom" placeholder="Nom du plat" type="text" />
                <BaseInput class="input" v-model="time" placeholder="Temps de preparation" type="time" />
                <BaseInput class="input" v-model="number" placeholder="Prix" type="number" />
                <ButtonPrimary :disabled="isSubmitting" @click="submitPlat">Ajouter le plat</ButtonPrimary>
            </div>

            <!-- Affichage du message -->
            <div v-if="message" :class="message.type" class="message">
                <p>{{ message.text }}</p>
            </div>

            <!-- Affiche les ingrédients non sélectionnés -->
            <IngredientsCarousel 
                :ingredients="filteredItems" 
                @select="toggleIngredient" 
            />
        </div>
    </div>
</template>


<script>
import axios from "axios";
import SideMenu from "../components/organisms/SideMenu.vue";
import PlatCard from "../components/molecules/Card.vue";
import ListAjout from "../components/organisms/ListAjout.vue";
import IngredientsCarousel from "../components/organisms/IngredientsCarousel.vue";
import ButtonPrimary from "../components/atoms/Button.vue";
import BaseInput from "../components/atoms/Input.vue";

export default {
    name: "AjoutPlat",
    components: { SideMenu, BaseInput, PlatCard, ListAjout, ButtonPrimary, IngredientsCarousel },
    data() {
        return {
            items: [], // Liste complète des ingrédients
            search: "", // Texte de recherche
            nom: "", // Nom du plat
            time: "", // Temps de préparation (en format "hh:mm")
            number: "", // Prix du plat
            message: null, // Message à afficher pour les erreurs ou succès
            isSubmitting: false // Indicateur de soumission en cours
        };
    },
    async mounted() {
        await this.fetchIngredients();
    },
    computed: {
        filteredItems() {
            if (!this.search.trim()) {
                return this.items.filter(item => !item.selected); // Si la recherche est vide, retourne tous les ingrédients non sélectionnés
            }

            const searchTerm = this.normalizeText(this.search);

            // Filtrer les ingrédients non sélectionnés en fonction de la recherche
            return this.items.filter(item => 
                !item.selected && this.normalizeText(item.name).includes(searchTerm)
            );
        }
    },
    methods: {
        async fetchIngredients() {
            try {
                const response = await axios.get("https://cuisine-qemt.onrender.com/api/ingredients");
                this.items = response.data.map(ingredient => ({
                    imageSrc: ingredient.nom.toLowerCase().replace(/\s+/g, '-') + ".svg",
                    name: ingredient.nom,
                    selected: false, // Initialisation à "false"
                    quantity: 0, // Quantité initiale à 0
                    id: ingredient.id // Assure-toi que 'id' existe dans l'objet de l'API
                }));
            } catch (error) {
                this.setMessage('error', "Erreur lors du chargement des ingrédients.");
            }
        },
        toggleIngredient(ingredient) {
            ingredient.selected = !ingredient.selected; // Toggle entre sélectionné et non sélectionné
            // Si sélectionné, on attribue une quantité de 1, sinon 0
            ingredient.quantity = ingredient.selected ? 1 : 0;
        },
        normalizeText(text) {
            return text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""); // Normaliser pour ignorer les accents et la casse
        },
        async submitPlat() {
            // Si la soumission est déjà en cours, ne rien faire
            if (this.isSubmitting) {
                return;
            }

            this.isSubmitting = true; // Indiquer que la soumission est en cours

            // Convertir le temps de préparation en minutes
            const timeInMinutes = this.convertTimeToMinutes(this.time);

            try {
                const platResponse = await axios.post("https://cuisine-qemt.onrender.com/api/plat", {
                    nom: this.nom,
                    tempsDePreparation: timeInMinutes,
                    id_restaurant_id: 1
                });

                const platId = platResponse.data.id;

                // Ajouter le prix
                const prixResponse = await axios.post("https://cuisine-qemt.onrender.com/api/prix", {
                    montant: this.number,
                    date_debut: new Date().toISOString().split('T')[0], // Date actuelle sans l'heure
                    idPlat: platId
                });

                // Filtrer les ingrédients sélectionnés avec une quantité > 0
                const selectedIngredients = this.items.filter(item => item.selected && item.quantity > 0);

                if (selectedIngredients.length > 0) {
                    // Créer les tableaux de quantités et d'IDs d'ingrédients
                    const quantities = selectedIngredients.map(item => item.quantity);
                    const ingredientIds = selectedIngredients.map(item => item.id);

                    // Appel à l'API pour lier les ingrédients au plat
                    try {
                        const recetteResponse = await axios.post("https://cuisine-qemt.onrender.com/api/liaisonPlatIngredients/makeRecette", {
                            idPlat: platId,
                            quantites: quantities, // Tableau des quantités d'ingrédients
                            idIngredients: ingredientIds // Tableau des IDs d'ingrédients
                        });

                        this.setMessage('success', "Plat créé avec succès !");
                    } catch (error) {
                        this.setMessage('error', "Erreur lors de l'ajout des ingrédients au plat.");
                        console.error("Erreur lors de l'ajout des ingrédients :", error.response ? error.response.data : error.message);
                    }
                } else {
                    this.setMessage('error', "Veuillez sélectionner au moins un ingrédient avec une quantité.");
                }
            } catch (error) {
                this.setMessage('error', "Erreur lors de la création du plat.");
                console.error("Erreur lors de la création du plat :", error.response ? error.response.data : error.message);
            } finally {
                this.isSubmitting = false; // Réinitialiser l'état de soumission
            }
        },
        convertTimeToMinutes(time) {
            const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
            return hours * 60 + minutes; // Convertir le temps en minutes
        },
        setMessage(type, text) {
            this.message = { type, text }; // Définit le type et le texte du message à afficher
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

    #add {
        @include card-background($card-background);
        border-radius: 20px;
        padding: 50px;
        height: 550px;
        margin-top: 130px;
        h2{
            color: $black-color;
            font-size: 40px;
            font-weight: 200;
            margin-bottom: 50px;
        }
        .form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
    }
    #ingList {
        margin: 0;
        height: 500px;
    }

    /* Style des messages de succès/erreur */
    .message {
        padding: 10px;
        margin-top: 20px;
        border-radius: 5px;
        text-align: center;
    }

    .message.success {
        background-color: #4CAF50;
        color: white;
    }

    .message.error {
        background-color: #f44336;
        color: white;
    }
</style>