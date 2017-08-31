const Router = require('koa-router')
const Review = require('../models/review')

module.exports = new Router({ prefix: '/review' })
  .get('/', async (ctx, next) =>
    (ctx.body = await Review.find().toArray()))
