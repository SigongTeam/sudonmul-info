<template>
  <button class="tap-button" @click="click">
    <slot></slot>
  </button>
</template>

<style scoped>
  @import "@vars";

  button {
    border: 1px solid #fff;
    color: #fff;
    font-family: var(--font);
    background: transparent;
    cursor: pointer;
    outline: none;
  }
</style>

<script>
export default {
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
