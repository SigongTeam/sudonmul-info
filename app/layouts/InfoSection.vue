<template>
  <section class="info-section">
    <h1>{{ averagePrice }}원</h1>
    <div>

      300mL 마실 때마다 약 n원이 절약됩니다. (다나와 기준 최소량)
    </div>
  </section>
</template>

<style>
  @import "@vars";
</style>

<script>
import axios from 'axios'
import sweetalert from 'sweetalert'

export default {
  data: () => ({ danawa: [] }),

  computed: {
    averagePrice () {
      return this.danawa.reduce((a, b) => a + b, 0) / (this.danawa.length || 1)
    }
  },

  created () {
    axios.get('/danawa')
      .then(({ data }) => (this.danawa = data))
      .catch(() => sweetalert('이런...', '다나와 물가를 찾을 수 없습니다.', 'error'))
  }
}
</script>
