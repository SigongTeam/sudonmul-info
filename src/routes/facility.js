const Router = require('koa-router')
const Facility = require('../models/Facility')

module.exports = new Router({ prefix: '/facility' })
  .post('/', Facility.getNearestFacility.bind(Facility))
