require('dotenv').config()
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')

const etag = require('koa-etag')
const serve = require('koa-static')
const logger = require('koa-chalk-logger')
const bodyParser = require('koa-bodyparser')
const conditional = require('koa-conditional-get')

const app = new Koa()
const router = new Router()

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

  app
    .use(logger())
    .use(conditional())
    .use(etag())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(dist, { maxage: 1000 * 60 * 30 }))
    .listen(port, () => console.log(`Listening on port ${port}`))
}

connectDatabase().then(startApp)
