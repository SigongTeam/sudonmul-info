const count = 2
const Review = require('../../models/Review')

const ips = require('./ips')
const jusos = require('./jusos')
const ratings = require('./ratings')
const messages = require('./messages')
const timestamps = require('./timestamps')

const { geocoder } = require('../../utils')

const review = () => {
  const juso = jusos()
  const location = geocoder.getDByJuso(juso)

  return new Review({
    ip: ips(),
    rating: ratings(),
    message: messages(),
    timestamp: timestamps(),

    juso,
    location: { type: 'Point', coordinates: location }
  })
}

module.exports = () => Promise
  .all([...Array(count)].map(review).map(r => r.save()))
  .then(() => console.log(`Created ${count} dummy data for review`))
