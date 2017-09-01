const Router = require('koa-router')
const Review = require('../models/Review')
const { geocoder } = require('../utils')

module.exports = new Router({ prefix: '/review' })
  .get('/', async ctx =>
    (ctx.body = await Review.find().sort('-timestamp').exec()))

  .post('/', async ctx => {
    const { location, rating, comment } = ctx.request.body
    const latlng = [location.latitude, location.longitude]

    const review = new Review({
      juso: await geocoder.getJusoByD(latlng),
      location: { type: 'Point', coordinates: latlng },

      rating,
      message: comment,
      timestamp: new Date(),
      ip: ctx.request.ip
    })

    ctx.body = await review.save()
  })
