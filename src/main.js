import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant';
import common from './libs/common.js'
import 'vant/lib/index.css'
import $ from 'n-zepto'
Vue.use(Vant);
Vue.use(common);
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
