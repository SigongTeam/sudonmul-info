const mongoose = require('mongoose')

const schema = mongoose.Schema({
  type: String,
  coordinates: [Number]
})

module.exports = schema
