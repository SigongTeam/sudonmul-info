class Geolocation {
  static async getParsedPosition () {
    const position = await this.getCurrentPosition()
    return this.parsePosition(position)
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

export default Geolocation
