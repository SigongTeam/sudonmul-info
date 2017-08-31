import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App)
})
