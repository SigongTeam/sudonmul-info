const count = 2
const Review = require('../models/Review')

const ips = require('./ips')
const jusos = require('./jusos')
const ratings = require('./ratings')
const messages = require('./messages')
const timestamps = require('./timestamps')
const { geocoder } = require('../utils')

const review = async () => {
  const juso = jusos()
  const dCode = await geocoder.getDByJuso(juso)
  const location = { type: 'Point', coordinates: dCode }

  const review = new Review({
    juso,
    location,
    ip: ips(),
    rating: ratings(),
    message: messages(),
    timestamp: timestamps()
  })

  return review.save()
}

module.exports = () => Promise.all([...Array(count)].map(review))
  .then(() => console.log(`Created ${count} dummy data for review`))
