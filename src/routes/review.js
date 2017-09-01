const Router = require('koa-router')
const Review = require('../models/Review')

module.exports = new Router({ prefix: '/review' })
  .get('/', Review.getReviews.bind(Review))
  .post('/', Review.postReview.bind(Review))
