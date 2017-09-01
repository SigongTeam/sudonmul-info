<template>
  <tap-section>
    <h1>정수장 수질 정보</h1>
    <canvas ref="canvas"></canvas>
  </tap-section>
</template>

<style scoped>
</style>

<script>
import axios from 'axios'
import Chart from 'chart.js'
import Geolocation from '../js/geolocation'
import moment from 'moment'

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
  async mounted () {
    const location = await Geolocation.getParsedPosition()

    const res = await axios('/facility', {
      data: {
        location
      }
    })

    res.data.forEach((v) => ['tbVal', 'clVal', 'phVal'].forEach((k, i) => config.data.datasets[i].data.push(v[k])))
    this.chart = new Chart(this.$refs.canvas.getContext('2d'), config)
  }
}
</script>
