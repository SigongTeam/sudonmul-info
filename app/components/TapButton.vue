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
    transition: all .5s ease;

    &:hover {
      background: rgba(255, 255, 255, .9);
      color: #303030;
    }
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
