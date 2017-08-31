<template>
  <i :class="`mdi mdi-${icon}`"></i>
</template>

<style scoped>
  @import "mdi/css/materialdesignicons.min.css";
</style>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      }
    }
  }
</script>
