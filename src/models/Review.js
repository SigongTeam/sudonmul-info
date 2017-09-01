const mongoose = require('mongoose')
const Location = require('./schema/Location')

const schema = mongoose.Schema({
  juso: { type: String, required: true },
  location: { type: Location, required: true },

  rating: { type: Number, index: true },
  timestamp: { type: Date, index: true },

  ip: { type: String, required: true },
  message: String
})

module.exports = mongoose.model('Review', schema)
