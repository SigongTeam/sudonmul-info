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

import axios from 'axios'
import Geolocation from './js/geolocation'

export default {
  components: {
    MainHeader,
    ReviewSection,
    WriteSection
  },

  async created () {
    const location = await Geolocation.getParsedPosition()
    const { data } = await axios.post('/where', { location })

    alert(JSON.stringify(location) + ' ->' + data.juso)
  }
}
</script>
