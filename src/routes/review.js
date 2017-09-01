const Router = require('koa-router')
const Review = require('../models/Review')

module.exports = new Router({ prefix: '/review' })

  .get('/', async ctx =>
    (ctx.body = await Review.find().exec()))

  .get('/:location', async ctx =>
    (ctx.body = await Review.find({ location }).exec()))

  .post('/', async ctx => {
    // TODO body->location = Geolocation::getParsedPosition
    // TODO body->rating = 0 (frown), 1 (norm), 2 (smile)
    // TODO body->comment = Review text
  })
