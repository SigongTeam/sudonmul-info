const axios = require('axios')
const ENDPOINT_URI = 'https://maps.googleapis.com/maps/api/geocode/json'

module.exports = class Geocoder {
  async get (params) {
    const { data } = await axios.get(ENDPOINT_URI, { params })

    if (!data || !data.results || !data.status) {
      throw new Error('Unexpected response data from geocode')
    }

    if (data.status !== 'OK') {
      throw new Error(`Unexpected response code '${data.status}'`)
    }

    return data
  }

  /**
   * @param {String} juso 도로명 주소
   * @return {Array} dcode
   */
  async getDByJuso (juso) {
    const data = await this.get({
      address: juso
    })

    const result = data.results[0]
    const { lat, lng } = result.geometry.location

    return [lat, lng]
  }

  /**
   * @param {Array} dCode
   */
  async getJusoByD (dCode) {
    const data = await this.get({
      latlng: dCode
    })

    const result = data.results[0]
    return result.formatted_address
  }
}
