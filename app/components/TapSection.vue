<template>
  <section>
    <div class="section-wrapper" :class="{centered}">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  @import "@vars";

  .section-wrapper {
    max-width: var(--section-width);
    width: 100%;
    height: 100%;
    margin: 0 auto;

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
