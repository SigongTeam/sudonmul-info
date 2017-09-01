<template>
  <tap-section class="chart-section">
    <h1>정수장 수질 정보</h1>
    <h3>
      {{ name }}
      <h5>{{ juso }}</h5>
    </h3>

    <canvas ref="tb"></canvas>
    <canvas ref="ph"></canvas>
    <canvas ref="cl"></canvas>
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
import moment from 'moment'
import Chart from 'chart.js'
import Geolocation from '../js/geolocation'
import TapSection from '../components/TapSection.vue'

const chartConfig = {
  type: 'line',

  options: {
    responsive: true,
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
        display: true
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

const cloneConfig = (datasets, labels) =>
  Object.assign({ data: { labels, datasets } }, chartConfig)

export default {
  data: () => ({ name: 'Loading..', juso: '정수장 정보를 불러오는 중입니다...' }),
  async mounted () {
    const location = await Geolocation.getParsedPosition()

    const res = await axios.post('/facility', {
      location: [location.latitude, location.longitude]
    })

    const qualities = res.data.qualities
    const labels = qualities.map(q => moment(q.date).format('MM/DD'))
    const values = {
      tb: [
        {
          label: '탁도 (NTU)',
          backgroundColor: '#00adb5',
          borderColor: '#00adb5',
          data: qualities.map(v => v.tbVal),
          fill: false
        },

        {
          label: '5-Star 수준 수질',
          backgroundColor: 'rgba(128, 128, 128, .2)',
          borderColor: '#BBB',
          data: [...Array(qualities.length)].map(v => 0.05),
          fill: 'origin'
        },

        {
          label: 'K-water 목표 수질',
          backgroundColor: 'rgba(128, 128, 128, .2)',
          borderColor: '#BBB',
          data: [...Array(qualities.length)].map(v => 0.1),
          fill: 'origin'
        }
      ],

      cl: [
        {
          label: '잔류 염소 농도 (mg/L)',
          backgroundColor: '#ff5722',
          borderColor: '#ff5722',
          data: qualities.map(v => v.clVal),
          fill: false
        },

        {
          label: 'K-water 상한 기준치',
          backgroundColor: 'rgba(128, 128, 128, .2)',
          borderColor: '#BBB',
          data: [...Array(qualities.length)].map(v => 1),
          fill: 2
        },

        {
          label: '최소 기준치',
          backgroundColor: 'rgba(128, 128, 128, .2)',
          borderColor: '#BBB',
          data: [...Array(qualities.length)].map(v => 0.09),
          fill: false
        }
      ],

      ph: [
        {
          label: 'pH 산도',
          backgroundColor: '#ffc107',
          borderColor: '#ffc107',
          data: qualities.map(v => v.phVal),
          fill: false
        },

        {
          label: '최대 기준치',
          backgroundColor: 'rgba(128, 128, 128, .2)',
          borderColor: '#BBB',
          data: [...Array(qualities.length)].map(v => 8.5),
          fill: 2
        },

        {
          label: '최소 기준치',
          backgroundColor: 'rgba(128, 128, 128, .2)',
          borderColor: '#BBB',
          data: [...Array(qualities.length)].map(v => 5.8),
          fill: false
        }
      ]
    }

    this.name = res.data.name
    this.juso = res.data.juso

    Object.keys(values).forEach(v =>
      new Chart(this.$refs[v].getContext('2d'), cloneConfig(values[v], labels)))
  },

  components: {
    TapSection
  }
}
</script>
