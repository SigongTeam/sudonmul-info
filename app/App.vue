<template>
  <main id="app">
    <main-header></main-header>
    <location-section></location-section>
    <write-section @write="write"></write-section>
    <info-section :opened="infoOpened"></info-section>
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
import LocationSection from './layouts/LocationSection.vue'
import MainHeader from './layouts/MainHeader.vue'
import ReviewSection from './layouts/ReviewSection.vue'
import WriteSection from './layouts/WriteSection.vue'
import InfoSection from './layouts/InfoSection.vue'

export default {
  data: () => ({ infoOpened: false }),
  components: {
    LocationSection,
    MainHeader,
    ReviewSection,
    WriteSection,
    InfoSection
  },

  methods: {
    write () {
      this.$refs.review.refresh()
      this.infoOpened = true
    }
  }
}
</script>
