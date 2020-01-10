import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfontLLR/iconfont.css'
import '@/lib/magic-check.css'
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
