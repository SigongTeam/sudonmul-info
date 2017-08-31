const Router = require('koa-router')

module.exports = new Router({ prefix: '/geolocation' })
  .post('/', async ctx => console.log('geo', (ctx.body = ctx.request.body)))
