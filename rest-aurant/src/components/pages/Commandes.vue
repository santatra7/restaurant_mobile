<template>
    <article>
        <div class="text">
            <h2>{{ user }}</h2>
            <p>{{ plat }}</p>
        </div>
    </article>
</template>

<script>
export default {
  name: "Commandes",
  props: {
    user: {
      type: String,
      required: true,
    },
    plat: {
      type: String,
      required: true,
    },
  },
};
</script>