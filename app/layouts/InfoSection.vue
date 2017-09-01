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
      const sum = this.danawa.reduce((a, b) => a + b, 0)
      return 0.15 * sum * (this.danawa.length || 1) // 2L -> 300mL
    }
  },

  created () {
    axios.get('/danawa')
      .then(({ data }) => (this.danawa = data))
      .catch(() => sweetalert('이런...', '다나와 물가를 찾을 수 없습니다.', 'error'))
  }
}
</script>
