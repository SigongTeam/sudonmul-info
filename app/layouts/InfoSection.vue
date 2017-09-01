<template>
  <tap-section class="info-section" :class="{opened}">
    <h1>절약량</h1>
    <div>
      수돗물을 300mL 마실 때마다 약 {{ beautifyNum(saved) }}원이 절약됩니다.<br>
      1회 300mL 기준, 지금까지 총 {{ beautifyNum(whole) }}원을 절약하셨습니다.
      <p class="fineprint">2L 생수를 300mL씩 나눠 마실 때, 2016년 9월 23일부터 적용되는 수도요금 단가와 다나와 생수 시세를 비교한 결과입니다.</p>
    </div>
  </tap-section>
</template>

<style scoped>
  @import "@vars";

  h1 {
    font-weight: 600;
  }

  .info-section {
    color: #fff;
    background: var(--info-background);
  }

  .info-section {
    padding: 0;
    max-height: 0;
    font-size: 1.5em;
    transition: all .4s ease;

    &.opened {
      padding: 20px 0;
      max-height: 100vh;
    }
  }

  p.fineprint {
    font-size: 0.5em;
    margin-top: 0.5em;
  }
</style>

<script>
import axios from 'axios'
import sweetalert from 'sweetalert'
import TapSection from '../components/TapSection.vue'

// 1000L 432.8원 -> 300mL 가격으로 변환
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
      return Math.max(this.averagePrice - TAP_PRICE, 0)
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
      .then(res => (this.danawa = res.data))
      .catch((err) => {
        console.error(err)
        sweetalert('이런...', '다나와 물가를 찾을 수 없습니다.', 'error')
      })
  },

  components: {
    TapSection
  }
}
</script>
