<template>
  <div class="login-container">
    <div class="login-card">
      <img src="../assets/images/logo.svg" alt="Logo" class="login-logo" />
      <BaseInput class="input" v-model="email" placeholder="E-mail" type="email" />
      <BaseInput class="input" v-model="password" placeholder="Mot de passe" type="password" />
      <ButtonPrimary class="button" @click="onLogin">Se connecter</ButtonPrimary>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ButtonPrimary from "../components/atoms/Button.vue";
import BaseInput from "../components/atoms/Input.vue";

export default {
  name: "Login",
  components: {
    ButtonPrimary,
    BaseInput,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async onLogin() {
      this.errorMessage = ""; // Reset erreur
      try {
        const response = await axios.post("https://cuisine-qemt.onrender.com/api/login/admin", {
          mail: this.email,
          mdp: this.password,
        });

        // Stocker l'utilisateur dans localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Rediriger vers l'accueil admin
        this.$router.push("/admin/home");
      } catch (error) {
        this.errorMessage = error.response?.data?.error || "Une erreur est survenue.";
      }
    },
  },
};
</script>

  
  <style lang="scss">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    @include background-image($background-animated);
    height: 100vh;
    .login-card {
      @include card-background($card-background);
      box-shadow: $card-background-hover;
      padding: 4rem 2rem;
      border-radius: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 600px;
      animation: fall 1.2s ease-out;
    }

    .login-logo {
      width: 200px;
      height: auto;
      margin-bottom: 1rem;
    }
  }
  .error-message {
    color: $secondary-color;
    margin-top: 10px;
  }
  </style>  