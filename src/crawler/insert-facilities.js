require('dotenv').config()

const KLiveWater = require('k-live-water')
const mongoose = require('mongoose')
const moment = require('moment')
const Facility = require('../models/Facility')
const geocoder = require('../utils/geocoder')

module.exports = async () => {
  mongoose.Promise = global.Promise
  await mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE
  })

  const klw = new KLiveWater(process.env.PUBLIC_DATA_API_KEY)
  const list = await klw.getSupplyLgIdCodeList()
  console.log('called')
  for (const facility of list) {
    if (await Facility.findOne({ name: facility.facilityName })) continue

    const data = {
      name: facility.facilityName,
      number: facility.code,
      juso: facility.lgIdFullAddr.replace(/\s+/g, ' ').split(' ').splice(0, 2).join(' '),
      location: {
        type: 'Point',
        coordinates: []
      },
      qualities: []
    }

    for (const d in [...Array(31)]) {
      const stTm = '00'
      const edTm = '12'
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
      const coordinates = await geocoder.getDByJuso(data.juso)
      data.location.coordinates = coordinates

      if (!quality) continue

      data.qualities.push({
        date: new Date(stDt),
        clVal: quality.clVal,
        phVal: quality.phVal,
        tbVal: quality.tbVal
      })
    }
    const doc = await Facility.create(data)
    console.log(doc)
  }
}

module.exports().then(() => console.log('fin')).catch(console.error)
