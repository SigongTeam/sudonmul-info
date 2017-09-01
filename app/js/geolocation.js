import sweetalert from 'sweetalert'

export default class Geolocation {
  static async getParsedPosition () {
    try {
      return this.parsePosition(await this.getCurrentPosition())
    } catch (err) {
      sweetalert('이런...', '현재 위치 정보를 불러올 수 없습니다.\n기본값으로 덕수궁을 불러옵니다.', 'error')
      return { latitude: 37.5658049, longitude: 126.9745989 }
    }
  }

  static getCurrentPosition () {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      } else {
        reject(new Error('not supported'))
      }
    })
  }

  static parsePosition (pos) {
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
