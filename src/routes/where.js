const Router = require('koa-router')
const { geocoder } = require('../utils')

module.exports = new Router({ prefix: '/where' })
  .post('/', async ctx => {
    const { latitude, longitude } = ctx.request.body.location
    const juso = await geocoder.getJusoByD([latitude, longitude])

    ctx.body = { juso }
  })
