const mongoose = require('mongoose')

const schema = mongoose.Schema({
  location: { type: String, index: true },
  rating: { type: Number, index: true },
  timestamp: { type: Date, index: true },

  ip: { type: String, required: true },
  message: String
})

module.exports = mongoose.model('Review', schema)
