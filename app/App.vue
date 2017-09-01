<template>
  <main id="app">
    <main-header></main-header>
    <location-section></location-section>
    <write-section @write="refresh"></write-section>
    <review-section ref="review"></review-section>
    <info-section></info-section>
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
import InfoSection from './layouts/InfoSection.vue'

export default {
  components: {
    LocationSection,
    MainHeader,
    ReviewSection,
    WriteSection,
    InfoSection
  },

  methods: {
    refresh () {
      this.$refs.review.refresh()
    }
  }
}
</script>
