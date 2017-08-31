const count = 2
const Review = require('../../models/Review')

const ips = require('./ips')
const ratings = require('./ratings')
const messages = require('./messages')
const locations = require('./locations')
const timestamps = require('./timestamps')

const review = () => new Review({
  ip: ips(),
  rating: ratings(),
  message: messages(),
  location: locations(),
  timestamp: timestamps()
})

module.exports = () => Promise
  .all([...Array(count)].map(review).map(r => r.save()))
  .then(() => console.log(`Created ${count} dummy data`))
