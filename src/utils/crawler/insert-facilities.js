require('dotenv').config()

const KLiveWater = require('k-live-water')
const mongoose = require('mongoose')
const moment = require('moment')
const Facility = require('../../models/Facility')
const geocoder = require('../geocoder')

module.exports = async () => {
  mongoose.Promise = global.Promise
  await mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE
  })

  const klw = new KLiveWater(process.env.PUBLIC_DATA_API_KEY)
  const list = await klw.getSupplyLgIdCodeList()

  for (const facility of list) {
    if (await Facility.findOne({ name: facility.facilityName })) continue
    console.log(facility)
    const data = {
      name: facility.facilityName,
      number: facility.code,
      juso: '',
      location: {
        type: 'Point',
        coordinates: []
      },
      qualities: []
    }


    for (const d of Object.keys([...Array(31)])) {
      const stTm = '00'
      const edTm = '03'
      const stDt = moment().subtract(31 - d, 'days').format('YYYY-MM-DD')
      const options = {
        stDt,
        stTm,
        edDt: stDt,
        edTm,
        numOfRows: 1,
        liIndDiv: 1,
        pageNo: 1,
        sujCode: data.number
      }
      const quality = (await klw.getWaterQuality(options))[0]
      if (!quality) continue

      data.juso = quality.facilityAddr
      data.qualities.push({
        date: new Date(stDt),
        clVal: quality.clVal,
        phVal: quality.phVal,
        tbVal: quality.tbVal
      })
    }
    if (data.qualities.length === 0) continue

    const coordinates = await geocoder.getDByJuso(data.juso)
    data.location.coordinates[0] = coordinates[1]
    data.location.coordinates[1] = coordinates[0]

    console.log(data)
    const doc = await Facility.create(data)
    console.log(doc.name, doc.number, data.qualities.length)
  }
}

module.exports().then(() => console.log('fin')).catch(err => {
  console.error(err)
  module.exports()
})
