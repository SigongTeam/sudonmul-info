const mongoose = require('mongoose')

const schema = mongoose.Schema({
  sujCode: { type: Number, required: true }
})

module.exports = mongoose.model('Facility', schema)
