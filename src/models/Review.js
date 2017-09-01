const mongoose = require('mongoose')
const Location = require('./schema/Location')
const Facility = require('./Facility')
const { geocoder } = require('../utils')

const schema = mongoose.Schema({
  juso: { type: String, required: true },
  location: { type: Location, required: true },
  facilityName: { type: String, required: true },

  rating: { type: Number, index: true },
  timestamp: { type: Date, index: true },

  ip: { type: String, required: true },
  message: String
})

schema.statics = {
  async getReviews (ctx) {
    const location = JSON.parse(ctx.query.location)
    const dCode = [location.latitude, location.longitude]

    const results = await Facility.mulloc(dCode)
    const facilityName = results[0].obj.name

    ctx.body = await this.find({ facilityName }).sort('-timestamp').limit(30).exec()
  },

  async postReview (ctx) {
    const { location, rating, comment } = ctx.request.body

    const latlng = [location.latitude, location.longitude]
    const results = await Facility.mulloc(latlng)
    const facilityName = results[0].obj.name

    const review = new this({
      juso: await geocoder.getJusoByD(latlng),
      location: { type: 'Point', coordinates: latlng },
      facilityName,
      rating,
      message: comment,
      timestamp: new Date(),
      ip: ctx.request.ip
    })

    ctx.body = await review.save()
  }
}

module.exports = mongoose.model('Review', schema)
