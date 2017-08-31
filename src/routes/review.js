const Router = require('koa-router')
const Review = require('../models/Review')

module.exports = new Router({ prefix: '/review' })

  .get('/', async ctx =>
    (ctx.body = await Review.find().exec()))

  .get('/:location', async ctx =>
    (ctx.body = await Review.find({ location }).exec()))
