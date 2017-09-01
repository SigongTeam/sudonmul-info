const Router = require('koa-router')

const { launch } = require('chrome-launcher')
const CDP = require('chrome-remote-interface')

const cache = {
  value: null,
  timestamp: new Date(0),
  period: 1000 * 60 * 60 * 3 // 3h
}

const launchOptions = {
  chromeFlags: ['--disable-gpu', '--headless'],
  startingUrl: 'http://search.danawa.com/dsearch.php?k1=%EC%83%9D%EC%88%98+2L&module=goods&act=dispMain'
}

const expression = `Array.prototype.slice
  .call(document.querySelectorAll('.prod_pricelist ul li:first-of-type .memory_price_sect'))
  .map(price => parseInt(price.textContent.split('/')[0].replace(/\\D/g, '')))`

function sleep (time) {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

async function gather () {
  const chrome = await launch(launchOptions)
  const protocol = await CDP({ port: chrome.port })

  const { Page, Runtime } = protocol
  await Promise.all([Page.enable(), Runtime.enable()])
  await Page.loadEventFired()

  await sleep(5000)
  const res = await Runtime.evaluate({ expression, returnByValue: true })

  protocol.close()
  chrome.kill()

  return res.result.value
}

module.exports = new Router({ prefix: '/danawa' })
  .get('/', async ctx => {
    if (!cache.value || (new Date() - cache.timestamp) >= cache.period) {
      cache.value = await gather()
      cache.timestamp = new Date()
    }

    ctx.body = cache.value
  })
