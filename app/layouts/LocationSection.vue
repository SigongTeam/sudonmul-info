<template>
  <section class="location-section" ref="location">
    <div class="wrapper">
      <div class="inner">
        {{ mLocation }}
      </div>
    </div>
  </section>
</template>

<style>
  @import "@vars";

  .location-section {
    background-image: url('../img/parallax.png');
    background-repeat: no-repeat;
    background-color: #00ADB5;
    background-size: cover;
    background-position: center;

    & .wrapper {
      background: rgba(0, 0, 0, .7);
      font-weight: 300;
      font-size: 4rem;
      min-height: 400px;
      padding: 8vw 50px;
      box-sizing: border-box;

      & .inner {
        color: #fff;
        max-width: 768px;
        margin: 0 auto;
        word-break: keep-all;
      }
    }
  }
</style>

<script>
import axios from 'axios'
import Geolocation from '../js/geolocation'

export default {
  data: () => ({ location: 'Loading...' }),

  computed: {
    mLocation () {
      const index = this.location.lastIndexOf(', ')
      if (index < 0) return this.location

      const first = this.location.substring(0, index + 2)
      const last = this.location.substring(index + 2)
      return first + '\n' + last
    }
  },

  async mounted () {
    const location = await Geolocation.getParsedPosition()
    const { data } = await axios.post('/where', { location })

    this.location = data.juso
  }
}
</script>
