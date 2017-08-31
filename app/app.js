import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import App from './App.vue'

Vue.use(Vuex)
Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})
