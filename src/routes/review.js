const Router = require('koa-router')
const Review = require('../models/Review')
const { geocoder } = require('../utils')

module.exports = new Router({ prefix: '/review' })
  .get('/', async ctx =>
    (ctx.body = await Review.find().exec()))

  .get('/:location', async ctx =>
    (ctx.body = await Review.find({ location }).exec()))

  .post('/', async ctx => {
    const { location, rating, comment } = ctx.request.body

    const review = new Review({
      juso: geocoder.getJusoByD(location),
      location: { type: 'Point', coordinates: location },

      rating,
      message: comment,
      timestamp: new Date(),
      ip: ctx.request.ip
    })

    ctx.body = await review.save()
  })
