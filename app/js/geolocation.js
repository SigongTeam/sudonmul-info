import sweetalert from 'sweetalert'

export default class Geolocation {
  static async getParsedPosition () {
    try {
      const pos = await this.getCurrentPosition()
      return this.parsePosition(pos)
    } catch (err) {
      sweetalert('이런...', '현재 위치 정보를 불러올 수 없습니다.\n기본값으로 서울시청을 불러옵니다.', 'error')
      return { latitude: 37.5222067, longitude: 126.9375121 }
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
