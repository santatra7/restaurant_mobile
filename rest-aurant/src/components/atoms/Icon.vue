<template>
    <li class="nav-item">
      <a :href="href" class="nav-link">
        <span class="nav-icon material-symbols-rounded">{{ icon }}</span>
        <span class="nav-label">{{ label }}</span>
      </a>
      <span class="nav-tooltip">{{ label }}</span>
    </li>
  </template>
  
  <script>
  export default {
    name: "Icon",
    props: {
      href: {
        type: String,
        default: "#",
      },
      icon: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style lang="scss">
  </style>
  