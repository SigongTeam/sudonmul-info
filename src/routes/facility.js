const Router = require('koa-router')
const Facility = require('../models/Facility')

module.exports = new Router({ prefix: '/facility' })
  .post('/', async ctx => {
    // TODO body->location = Geolocation::getParsedPosition
    // TODO return->[{tbVal, clVal, phVal}][30]

    const data = ctx.request.body
    if (!data.location) {
      // TODO Bad request
    }

    const point = {type: 'Point', coordinates: [parseFloat(data.location[1]), parseFloat(data.location[0])]}

    const results = (await Facility.geoNear(point, {
      spherical: true,
      near: point.coordinates,
      limit: 1
    }))

    const obj = []
    results.forEach(v => {
      //console.log('v', v.obj)
      //console.log('v.getOwnProperties()', Object.getOwnPropertyNames(v.obj))
      obj.push(v.obj.qualities) // FIXME
    })

    ctx.body = obj
  })
