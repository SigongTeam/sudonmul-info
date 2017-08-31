<template>
  <main id="app">
    <main-header></main-header>
		<review-section></review-section>
  </main>
</template>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }
</style>

<script>
  import MainHeader from './layouts/MainHeader.vue'
import ReviewSection from './layouts/ReviewSection.vue'

  export default {
    components: {
      MainHeader,
      ReviewSection
    }
  }
</script>
