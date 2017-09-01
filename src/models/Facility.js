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

module.exports = mongoose.model('Facility', schema)
