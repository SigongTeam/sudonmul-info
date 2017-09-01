const Router = require('koa-router')
const Facility = require('../models/Facility')

module.exports = new Router({ prefix: '/facility' })
  .post('/', async ctx => {
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

    const f = results[0].obj

    ctx.body = {
      name: f.name,
      juso: f.juso,
      qualities: f.qualities
    }
  })
