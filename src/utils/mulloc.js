const Facility = require('../models/Facility')

module.exports = {
  async getNearestFacility (lat, long) {
    const cord = {
      type: 'Point',
      coordinates: [lat, long]
    }
    const result = await Facility.geoNear(cord, {})
    return result
  }
}
