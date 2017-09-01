const axios = require('axios')
// const cheerio = require('cheerio')
// const FormData = require('form-data')

const DANAWA_SEARCH = 'http://search.danawa.com/ajax/getProductList.ajax.php'

// let lastUpdate = new Date(0)

module.exports = () => {
  axios.post(DANAWA_SEARCH)
}
