const KLiveWater = require('k-live-water')
const dateformat = require('dateformat')
const Facility = require('../models/Facility')
const config = require('./config')
const geocoder = require('../utils/geocoder')

module.exports = async () => {
  const klw = new KLiveWater(config.key)
  const list = await klw.getSupplyLgIdCodeList()
  console.log('called')
  for (const facility of list) {
    console.log(facility)
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
    const coordinates = await geocoder.getDByJuso(data.juso)
    data.location.coordinates = coordinates

    for (const d in [...Array(31)]) {
      const stTm = '00'
      const edTm = '01'
      const stDt = dateformat(new Date(new Date().setDate(new Date().getDate() - 31 + d)), 'yyyy-mm-dd')
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
      console.log(options)
      const quality = (await klw.getWaterQuality(options))[0]
      data.qualities.push({
        date: new Date(stDt),
        clVal: quality.clVal,
        phVal: quality.phVal,
        tbVal: quality.tbVal
      })
      const doc = await Facility.create(data)
      console.log(doc)
    }
  }
}
