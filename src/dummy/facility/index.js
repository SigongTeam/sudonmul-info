const count = 2
const Facility = require('../../models/Facility')

const facility = () => new Facility({
  sujCode: Math.floor(Math.random() * 999)
})

module.exports = () => Promise
  .all([...Array(count)].map(facility).map(r => r.save()))
  .then(() => console.log(`Created ${count} dummy data for facility`))
