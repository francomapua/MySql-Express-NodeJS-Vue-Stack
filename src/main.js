import Vue from 'vue'
import App from './App.vue'
import vueRouter from './vueRouter'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'

const token = sessionStorage.getItem('token')
store.commit('user/token', token)  

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

vueRouter.beforeEach((to, from, next) => {
  console.log('to :>> ', to)
  console.log('from :>> ', from)
  // TODO check auth
  //Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
  next()
});

new Vue({
  router : vueRouter,
  store,
  render: h => h(App)
}).$mount('#app')
