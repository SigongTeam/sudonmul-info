const count = 10
const Review = require('../models/Review')
const Facility = require('../models/Facility')

const ips = require('./ips')
const jusos = require('./jusos')
const ratings = require('./ratings')
const messages = require('./messages')
const timestamps = require('./timestamps')
const { geocoder } = require('../utils')

const review = async () => {
  const dCode = await geocoder.getDByJuso(jusos())

  const results = await Facility.mulloc(dCode)
  const facilityName = results[0].obj.name

  const juso = await geocoder.getJusoByD(dCode)
  const location = { type: 'Point', coordinates: dCode }

  const review = new Review({
    juso,
    location,
    facilityName,

    ip: ips(),
    rating: ratings(),
    message: messages(),
    timestamp: timestamps()
  })

  return review.save()
}

module.exports = () => Promise.all([...Array(count)].map(review))
  .then(() => console.log(`Created ${count} dummy data for review`))
