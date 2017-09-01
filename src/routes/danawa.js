const Router = require('koa-router')

const { launch } = require('chrome-launcher')
const CDP = require('chrome-remote-interface')

const chromeFlags = ['--disable-gpu', '--headless']
const startingUrl = 'http://search.danawa.com/dsearch.php?k1=%EC%83%9D%EC%88%98+2L&module=goods&act=dispMain'
const expression = `Array.prototype.slice
    .call(document.querySelectorAll('.prod_pricelist ul li:first-of-type .memory_price_sect'))
    .map(price => parseInt(price.textContent.split('/')[0].replace(/\\D/g, '')))`

const delay = (func, time) =>
  new Promise((resolve, reject) =>
    setTimeout(() => func().then(resolve), time))

module.exports = new Router({ prefix: '/danawa' }).get('/', async ctx => {
  const chrome = await launch({ startingUrl, chromeFlags })
  const protocol = await CDP({ port: chrome.port })

  const { Page, Runtime } = protocol
  await Promise.all([Page.enable(), Runtime.enable()])
  await Page.loadEventFired()

  await delay(async () => {
    const res = await Runtime.evaluate({ expression, returnByValue: true })
    ctx.body = res.result.value

    protocol.close()
    chrome.kill()
  }, 5000)
})
