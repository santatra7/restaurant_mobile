<template>
    <div class="client">
      <figure id="client">
        <img src="../../assets/images/profil.png" alt="" />
      </figure>
      <div class="text">
        <h2>{{ nom }} <span>({{ pseudo }})</span></h2>
        <p>{{ mail }}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Client",
        props: {
            nom: {
                type: String,
                required: true,
            },
            pseudo: {
                type: String,
                required: true,
            },
            mail: {
                type: Number,
                required: true,
            },
        },
    };
</script>

<style lang="scss">
    @use "@/scss/components/plats" as *;
    .client {
        @include card-design-mini($card-background);
        width: 70%;
        margin-bottom: 20px;
    }
</style>