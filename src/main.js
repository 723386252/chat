import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.min.css'

// eslint-disable-next-line no-unused-vars
import $ from 'jquery'

import 'bootstrap/dist/js/bootstrap.bundle'

import 'bootstrap/dist/js/bootstrap.min.js'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
