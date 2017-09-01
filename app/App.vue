<template>
  <main id="app">
    <main-header></main-header>
    <location-section></location-section>
    <write-section @write="write"></write-section>
    <info-section :opened="infoOpened"></info-section>
    <chart-section></chart-section>
    <review-section ref="review"></review-section>
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
import LocationSection from './layouts/LocationSection.vue'
import WriteSection from './layouts/WriteSection.vue'
import InfoSection from './layouts/InfoSection.vue'
import ChartSection from './layouts/ChartSection.vue'
import ReviewSection from './layouts/ReviewSection.vue'

export default {
  data: () => ({ infoOpened: false }),

  components: {
    ChartSection,
    LocationSection,
    MainHeader,
    ReviewSection,
    WriteSection,
    InfoSection
  },

  methods: {
    write () {
      this.$refs.review.refresh()
      localStorage.setItem('amount', parseInt(localStorage.getItem('amount') || 0) + 1)
      this.infoOpened = true
    }
  }
}
</script>
