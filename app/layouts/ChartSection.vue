<template>
  <tap-section class="chart-section">
    <h1>정수장 수질 정보</h1>
    <h3>{{name}}</h3>
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
import Chart from 'chart.js'
import Geolocation from '../js/geolocation'
import moment from 'moment'
import TapSection from '../components/TapSection.vue'

const chartConfig = {
  type: 'line',
  data: {
    labels: [...Array(15)].map((v, k) => k).map(i => moment().subtract(i * 2, 'd').format('MM/DD')),
    datasets: []
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

const cloneConfig = (db) => {
  const defaultConfig = JSON.parse(JSON.stringify(chartConfig))
  defaultConfig.data.datasets = db
  return defaultConfig
}

export default {
  data: () => ({name: 'Loading..'}),
  async mounted () {
    const location = await Geolocation.getParsedPosition()

    const res = await axios.post('/facility', {
      location: [location.latitude, location.longitude]
    })

    const qualities = res.data.qualities

    const valueSet = {
      tb: [
        {
          label: '탁도 (NTU)',
          backgroundColor: '#00adb5',
          borderColor: '#00adb5',
          data: qualities.map((v) => v.tbVal),
          fill: false
        },

        {
          label: '최대 기준치',
          backgroundColor: 'rgba(255, 0, 0, .3)',
          borderColor: '#ff5722',
          data: [...Array(15)].map((v) => 1),
          fill: 'origin'
        }
      ],

      ph: [
        {
          label: 'pH 산도',
          backgroundColor: '#00adb5',
          borderColor: '#00adb5',
          data: qualities.map((v) => v.phVal),
          fill: false
        },
        {
          label: '최대 기준치',
          backgroundColor: 'rgba(255, 0, 0, .3)',
          borderColor: '#ff5722',
          data: [...Array(15)].map((v) => 8.5),
          fill: 2
        },
        {
          label: '최소 기준치',
          backgroundColor: 'rgba(255, 0, 0, .3)',
          borderColor: '#ff5722',
          data: [...Array(15)].map((v) => 5.8),
          fill: false
        }
      ],

      cl: [
        {
          label: '잔류 염소 농도 (mg/L)',
          backgroundColor: '#00adb5',
          borderColor: '#00adb5',
          data: qualities.map((v) => v.clVal),
          fill: false
        },
        {
          label: '최대 기준치',
          backgroundColor: 'rgba(255, 0, 0, .3)',
          borderColor: '#ff5722',
          data: [...Array(15)].map((v) => 2),
          fill: 'origin'
        }
      ]
    }

    this.name = res.data.name

    const dataList = ['tb', 'cl', 'ph']

    dataList.forEach((v) => new Chart(this.$refs[v].getContext('2d'), cloneConfig(valueSet[v])))
  },

  components: {
    TapSection
  }
}
</script>
