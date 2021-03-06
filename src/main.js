import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'amfe-flexible'
import 'amfe-flexible/index.js'
import Vant from 'vant';
import common from './libs/common.js'
import 'vant/lib/index.css'
// import 'mapbox-gl/src/css/mapbox-gl.css'
import lrz from 'lrz'  
import VueI18n from 'vue-i18n'
Vue.use(VueI18n) // 通过插件的形式挂载
Vue.use(Vant);
Vue.use(common);
// Vue.use(lrz);
Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: navigator.language,    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en')    // 英文语言包
  }
})
console.log(window.document.title)
router.beforeEach((to, from, next) => {
  console.log(to)
  if(document.getElementById('loading')){
    document.body.removeChild(document.getElementById('loading'))
  }
  next()
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
