const mongoose = require('mongoose')
const Location = require('./schema/Location')

const schema = mongoose.Schema({
  juso: { type: String, required: true },
  location: { type: Location, required: true },

  sujCode: { type: Number, required: true },
  updated: { type: Date, required: true },
  clVal: { type: Number, required: true },
  phVal: { type: Number, required: true },
  tbVal: { type: Number, required: true }
})

module.exports = mongoose.model('Facility', schema)
