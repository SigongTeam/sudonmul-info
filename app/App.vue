<template>
  <v-app id="app">
    <main-header></main-header>
    <review-section></review-section>
  </v-app>
</template>

<style scoped>
  @import "vuetify/dist/vuetify.min.css";

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
