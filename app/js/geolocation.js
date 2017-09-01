import sweetalert from 'sweetalert'

const errorPosition = { latitude: 35.891823, longitude: 128.610743 }
const errorMessage = '현재 위치 정보를 불러올 수 없습니다.\n기본값을 불러옵니다.'

export default {
  async getParsedPosition () {
    try {
      return this.parsePosition(await this.getCurrentPosition())
    } catch (err) {
      sweetalert('이런...', errorMessage, 'error')
      return errorPosition
    }
  },

  getCurrentPosition () {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      } else {
        reject(new Error('not supported'))
      }
    })
  },

  parsePosition (pos) {
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
}
