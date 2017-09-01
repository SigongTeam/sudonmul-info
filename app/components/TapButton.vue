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
      &.smile {
        border-color: var(--smile-color);
        color: var(--smile-color);
      }

      &.norm {
        border-color: var(--norm-color);
        color: var(--norm-color);
      }

      &.frown {
        border-color: var(--frown-color);
        color: var(--frown-color);
      }
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
