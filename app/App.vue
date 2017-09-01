<template>
  <main id="app">
    <main-header></main-header>
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
import MainHeader from './layouts/MainHeader.vue'
import ReviewSection from './layouts/ReviewSection.vue'
import WriteSection from './layouts/WriteSection.vue'

export default {
  components: {
    MainHeader,
    ReviewSection,
    WriteSection
  },

  async created () {
    getCurrentPosition()
      .then(sendPosition)
      .catch(err => alert('Geolocation error: ' + err.message))
  }
}
</script>
