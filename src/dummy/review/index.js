const count = 2
const Review = require('../../models/Review')

const ips = require('./ips')
const jusos = require('./jusos')
const ratings = require('./ratings')
const messages = require('./messages')
const timestamps = require('./timestamps')

const { geocoder } = require('../../utils')

const review = async () => {
  const juso = jusos()
  const location = await geocoder.getDByJuso(juso)

  const review = new Review({
    ip: ips(),
    rating: ratings(),
    message: messages(),
    timestamp: timestamps(),

    juso,
    location: { type: 'Point', coordinates: location }
  })

  return review.save()
}

module.exports = () => Promise.all([...Array(count)].map(review))
  .then(() => console.log(`Created ${count} dummy data for review`))
