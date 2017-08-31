const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')

const etag = require('koa-etag')
const serve = require('koa-static')
const logger = require('koa-chalk-logger')
const bodyParser = require('koa-bodyparser')
const conditional = require('koa-conditional-get')

const app = new Koa()
const router = new Router()

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
