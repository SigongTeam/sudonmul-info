<template>
  <i :class="`mdi mdi-${icon}`"></i>
</template>

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
