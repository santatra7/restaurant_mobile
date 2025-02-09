<template>
    <div class="login-container">
      <div class="login-card">
        <img src="../assets/images/logo.svg" alt="Logo" class="login-logo" />
        <!-- <h2>Connexion</h2> -->
        <BaseInput class="input" v-model="email" placeholder="E-mail" type="email" />
        <BaseInput class="input" v-model="password" placeholder="Mot de passe" type="password" />
        <ButtonPrimary class="button" @click="onLogin">Se connecter</ButtonPrimary>
      </div>
    </div>
  </template>
  
  <script>
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
      };
    },
    methods: {
      onLogin() {
        alert("Connexion en cours...");
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
  </style>  