<template>
  <main id="app">
    <main-header></main-header>
    <location-section></location-section>
    <write-section></write-section>
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
import LocationSection from './layouts/LocationSection.vue'
import MainHeader from './layouts/MainHeader.vue'
import ReviewSection from './layouts/ReviewSection.vue'
import WriteSection from './layouts/WriteSection.vue'

export default {
  components: {
    LocationSection,
    MainHeader,
    ReviewSection,
    WriteSection
  }
}
</script>
