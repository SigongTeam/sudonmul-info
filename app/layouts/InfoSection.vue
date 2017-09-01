<template>
  <tap-section class="info-section" :class="{opened}">
    <h1>절약량</h1>
    <div>
      300mL 마실 때마다 약 {{ beautifyNum(saved) }}원이 절약됩니다.<br>
      1회 300mL 기준 지금까지 총 {{ beautifyNum(whole) }}원을 절약하셨습니다.
      <p class="fineprint">다나와 기준 최소량, 2L 샘물을 300mL로 나눠마실 때, 16.9.23일부터 적용되는 수도요금 단가 기준</p>
    </div>
  </tap-section>
</template>

<style scoped>
  @import "@vars";

  h1 {
    font-weight: 600;
  }

  .info-section {
    background: var(--info-background);
    color: #fff;
  }

  .info-section {
    max-height: 0;
    padding: 0;
    transition: all .4s ease;
    font-size: 1.5em;

    &.opened {
      padding: 20px 0;
      max-height: 100vh;
    }
  }

  p.fineprint {
    margin-top: 0.5em;
    font-size: 0.6em;
  }
</style>

<script>
import axios from 'axios'
import sweetalert from 'sweetalert'
import TapSection from '../components/TapSection.vue'

const TAP_PRICE = 432.8 / 1000 * 0.3

export default {
  data: () => ({ danawa: [] }),

  props: {
    opened: {
      type: Boolean
    }
  },

  computed: {
    averagePrice () {
      const sum = this.danawa.reduce((a, b) => a + b, 0)
      const average = sum / (this.danawa.length || 1)
      return 300 / 2000 * average // 2L 가격 -> 300mL
    },

    saved () {
      return this.averagePrice - TAP_PRICE
    },

    whole () {
      return this.saved * localStorage.getItem('amount')
    }
  },

  methods: {
    beautifyNum (number) {
      return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },

  created () {
    axios.get('/danawa')
      .then(({ data }) => (this.danawa = data))
      .catch((err) => {
        sweetalert('이런...', '다나와 물가를 찾을 수 없습니다.', 'error')
        console.error(err)
      })
  },

  components: {
    TapSection
  }
}
</script>
