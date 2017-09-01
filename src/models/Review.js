const mongoose = require('mongoose')

const schema = mongoose.Schema({
  juso: { type: String, required: true },
  location: { type: String, coordinates: [Number], required: true },

  rating: { type: Number, index: true },
  timestamp: { type: Date, index: true },

  ip: { type: String, required: true },
  message: String
})

module.exports = mongoose.model('Review', schema)
