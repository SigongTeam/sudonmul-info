const mongoose = require('mongoose')
const Location = require('./schema/Location')

const Quality = mongoose.Schema({
  date: { type: Date, required: true },
  clVal: { type: Number, required: true },
  phVal: { type: Number, required: true },
  tbVal: { type: Number, required: true }
})

const schema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: Number, required: true, unique: true },

  juso: { type: String, required: true },
  location: { type: Location, required: true },

  qualities: { type: [Quality], required: true }
})

schema.statics = {
  mulloc (location) {
    const point = {
      type: 'Point',
      coordinates: [
        parseFloat(location[1]),
        parseFloat(location[0])
      ]
    }

    return this.geoNear(point, {
      spherical: true,
      limit: 1
    })
  },
  async getNearestFacility (ctx) {
    const body = ctx.request.body
    if (!body.location) {
      const err = new Error()
      err.statusCode = 400
      throw err
    }
    const results = await this.mulloc(body.location)
    const f = results[0].obj

    ctx.body = {
      name: f.name,
      juso: f.juso,
      qualities: f.qualities
    }
  }
}

module.exports = mongoose.model('Facility', schema)
