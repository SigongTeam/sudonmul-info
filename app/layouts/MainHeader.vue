<template>
  <header class="main-header">
    <icon icon="information-outline"></icon>
  </header>
</template>

<style>
  @import "@css/variables";

  .main-header {
    background-color: var(--header-color);
    width: 100%;
    height: 20vh;
    font-family: var(--font);
    font-size: 2rem;
  }
</style>

<script>
  import Icon from '../components/Icon.vue'

  export default {
    components: {
      Icon
    }
  }
</script>
