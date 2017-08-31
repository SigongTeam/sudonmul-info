<template>
  <v-app id="app">
    <main-header></main-header>
    <v-btn dark primary>Button!</v-btn>
  </v-app>
</template>

<style>
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

export default {
  components: {
    MainHeader
  }
}
</script>
