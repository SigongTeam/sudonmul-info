require('dotenv').config()

const path = require('path')
const mongoose = require('mongoose')

const Koa = require('koa')
const boom = require('./boom')
const routes = require('./routes')

const etag = require('koa-etag')
const serve = require('koa-static')
const logger = require('koa-chalk-logger')
const bodyParser = require('koa-bodyparser')
const conditional = require('koa-conditional-get')

async function connectDatabase () {
  mongoose.Promise = global.Promise

  await mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE
  })

  console.log(`Connected to database ${mongoose.connection.name}`)
}

function startApp () {
  const port = process.env.PORT || 8080
  const dist = path.join(__dirname, '..', 'dist')

  return new Koa()
    .use(logger())
    .use(conditional())
    .use(etag())
    .use(bodyParser())
    .use(boom())
    .use(routes())
    .use(serve(dist, { maxage: 1000 * 60 * 30 }))
    .listen(port, () => console.log(`Listening on port ${port}`))
}

connectDatabase()
  .then(startApp)
  .then(require('./dummy/review/index'))
  .then(require('./dummy/facility/index'))
