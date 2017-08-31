<template>
  <main id="app">
    <main-header></main-header>
    <review-section></review-section>
  </main>
</template>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
  }
</style>

<script>
import './css/base.css'
import MainHeader from './layouts/MainHeader.vue'
import ReviewSection from './layouts/ReviewSection.vue'

function getCurrentPosition () {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    } else {
      reject(new Error('not supported'))
    }
  })
}

function parsePosition (pos) {
  const { coords, timestamp } = pos
  const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed } = coords

  return {
    timestamp,
    latitude,
    longitude,
    altitude,
    accuracy,
    altitudeAccuracy,
    heading,
    speed
  }
}

function sendPosition (pos) {
  return fetch('/geolocation', {
    method: 'POST',
    body: JSON.stringify(parsePosition(pos)),
    headers: { 'Content-Type': 'application/json' }
  })
}

export default {
  components: {
    MainHeader,
    ReviewSection
  },

  async created () {
    getCurrentPosition()
      .then(sendPosition)
      .catch(err => alert('Geolocation error: ' + err))
  }
}
</script>
