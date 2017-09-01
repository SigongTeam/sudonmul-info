const mongoose = require('mongoose')

const Quality = mongoose.Schema({
  date: { type: Date, required: true },
  clVal: { type: Number, required: true },
  phVal: { type: Number, required: true },
  tbVal: { type: Number, required: true }
})

const schema = mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  juso: { type: String, required: true },
  location: { type: String, coordinates: [Number], required: true },
  qualities: { type: [Quality], required: true }
})

module.exports = mongoose.model('Facility', schema)
