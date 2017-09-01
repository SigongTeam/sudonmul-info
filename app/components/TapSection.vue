<template>
  <section>
    <div class="section-wrapper" :style="innerStyle" :class="{centered}">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  @import "@vars";

  section {
    padding: 20px 0;
    box-sizing: border-box;
  }

  .section-wrapper {
    max-width: var(--section-width);
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;

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
    },

    innerStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
