const mongoose = require('mongoose')

const schema = mongoose.Schema({
  sujCode: { type: Number, required: true },
  juso: { type: String, required: true },
  location: { type: String, coordinates: [Number], required: true },
  updated: { type: Date, required: true },
  clVal: { type: Number, required: true },
  phVal: { type: Number, required: true },
  tbVal: { type: Number, required: true }
})

module.exports = mongoose.model('Facility', schema)
