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
  }
</style>

<script>
import './css/base.css'
import MainHeader from './layouts/MainHeader.vue'
import ReviewSection from './layouts/ReviewSection.vue'

export default {
  components: {
    MainHeader,
    ReviewSection
  }
}
</script>
