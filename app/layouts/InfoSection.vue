<template>
  <section class="info-section">
    <carousel>
      <slide>
        <h1>Coin</h1>
        <div>
          300mL 마실 때마다 약 n원이 절약됩니다. (다나와 기준 최소량)
        </div>
      </slide>
    </carousel>
  </section>
</template>

<style>
  @import "@vars";
</style>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: { Carousel, Slide }
}
</script>
