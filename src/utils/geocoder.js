// const Kwater = require('k-live-water')
const rp = require('request-promise')
const ENDPOINT_URI = 'https://maps.googleapis.com/maps/api/geocode/json'

module.exports = class Geocoder {
  constructor ({ key }) {
    this.key = key
  }

  /**
   * @param {String} juso 도로명 주소
   * @return {Array} dcode
   */
  async getDByJuso (juso) {
    const r = await rp({
      uri: ENDPOINT_URI,
      qs: {
        address: juso,
        key: this.key
      }
    })

    const body = JSON.parse(r)
    this._verifyError(body)

    const result = body.results[0]
    const {lat, lng} = result.geometry.location
    return [lat, lng]
  }

  /**
   * @param {Array} cord dCode
   */
  async getJusoByD (cord) {
    const r = await rp({
      uri: ENDPOINT_URI,
      qs: {
        latlng: cord,
        key: this.key
      }
    })

    const body = JSON.parse(r)
    this._verifyError(body)

    const result = body.results[0]
    return result['formatted_address']
  }

  _verifyError (body) {
    if (!body || !body.results || !body.status) throw new Error('Unexpected response data from geocode')
    if (body.status !== 'OK') throw new Error(`Unexpected response code "${body.status}"`)
  }
}
