<template>
  <section>
    <div class="section-wrapper" :class="{centered}">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  .section-wrapper {
    max-width: 768px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 10px;

    &.centered {
      display: flex;
      align-items: center;
    }
  }
</style>

<script>
export default {
  props: {
    centered: {
      type: Boolean
    }
  }
}
</script>
