const Router = require('koa-router')

module.exports = new Router({ prefix: '/facility' })
  .post('/', async ctx => {
    // TODO body->location = Geolocation::getParsedPosition
    // TODO return->[{tbVal, clVal, phVal}][30]
  })
