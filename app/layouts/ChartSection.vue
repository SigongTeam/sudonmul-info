<template>
  <tap-section class="chart-section">
    <h1>정수장 수질 정보</h1>
    <h3>{{name}}</h3>
    <canvas ref="canvas"></canvas>
  </tap-section>
</template>

<style scoped>
  .chart-section {
    background: #eeeeee;

    & h1 {
      font-weight: 600;
    }

    & canvas {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>

<script>
import axios from 'axios'
import Chart from 'chart.js'
import Geolocation from '../js/geolocation'
import moment from 'moment'
import TapSection from '../components/TapSection.vue'

const config = {
  type: 'line',
  data: {
    labels: [...Array(15)].map((v, k) => k).map(i => moment().subtract(i * 2, 'd').format('MM/DD')),
    datasets: [{
      label: '탁도',
      backgroundColor: '#ff5722',
      borderColor: '#ff5722',
      data: [],
      fill: false
    }, {
      label: 'pH 산도',
      backgroundColor: '#ffc107',
      borderColor: '#ffc107',
      data: [],
      fill: false
    }, {
      label: '잔류 염소 농도',
      backgroundColor: '#00adb5',
      borderColor: '#00adb5',
      data: [],
      fill: false
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: '정수지 수질 정보'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
}

export default {
  data: () => ({name: 'Loading..'}),
  async mounted () {
    const location = await Geolocation.getParsedPosition()

    const res = await axios.post('/facility', {
      location: [location.latitude, location.longitude]
    })

    res.data.qualities.forEach((v) => ['tbVal', 'phVal', 'clVal'].forEach((k, i) => {
      config.data.datasets[i].data.push(v[k])
    }))

    this.name = res.data.name
    this.chart = new Chart(this.$refs.canvas.getContext('2d'), config)
  },

  components: {
    TapSection
  }
}
</script>
