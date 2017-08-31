const Router = require('koa-router')
const Review = require('../models/Review')

module.exports = new Router({ prefix: '/review' })
  .get('/', async (ctx, next) =>
    (ctx.body = await Review.find().limit(50).exec()))
