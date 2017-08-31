<template>
  <tap-section class="main-header" centered>
    <icon icon="information-outline"></icon> 수돈물
  </tap-section>
</template>

<style scoped>
  @import "@vars";
  .main-header {
    background-color: var(--header-background);
    height: 20vh;
    font-size: 5rem;
    color: #fff;
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
