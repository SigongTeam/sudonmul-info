const mongoose = require('mongoose')

const Point = mongoose.Schema({
  type: String,
  coordinates: Array
})

const schema = mongoose.Schema({
  sujCode: { type: Number, required: true },
  juso: { type: String, required: true },
  location: { type: Point, required: true }
})

module.exports = mongoose.model('Facility', schema)
