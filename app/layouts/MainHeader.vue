<template>
  <tap-section class="main-header" centered>
    <img src="../img/logo.svg" alt="Logo">
  </tap-section>
</template>

<style scoped>
  @import "@vars";
  .main-header {
    background-color: var(--header-background);
    height: 10vh;
    font-size: 4rem;
    color: #fff;

    & img {
      height: calc(10vh - 20px);
    }
  }
</style>

<script>
import Icon from '../components/Icon.vue'
import TapSection from '../components/TapSection.vue'

export default {
  components: {
    Icon,
    TapSection
  }
}
</script>
