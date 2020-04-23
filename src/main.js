// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'


import myplugin from './plugin/MyPlugin'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'






//自定义指令



Vue.config.productionTip = false






Vue.use(myplugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
