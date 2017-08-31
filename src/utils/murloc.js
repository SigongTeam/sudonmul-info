// const Kwater = require('k-live-water')
const rp = require('request-promise')
const ENDPOINT_URI = 'https://maps.googleapis.com/maps/api/geocode/json'

module.exports = class Murloc {
  constructor (key) {
    this.key = key
  }

  /**
   * @param {String} juso 도로명 주소
   */
  async fetchGeocode (juso) {
    const r = await rp({
      uri: ENDPOINT_URI,
      qs: {
        address: juso,
        key: this.key
      }
    })

    const body = JSON.parse(r)

    if (!body || !body.results || !body.status) {
      throw new Error('Unexpected response data from geocode')
    }

    if (body.status === 'OK') {
      const result = body.results[0]
      const {lat, lng} = result.geometry.location

      return {lat, lng}
    }

    throw new Error(`Unexpected response code "${body.status}"`)
  }
}
