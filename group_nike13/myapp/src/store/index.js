import Vue from 'vue'
import Vuex from 'vuex'
// 引入购物车的模块
import cart from '@/views/cart/store'
import user from '@/views/user/store'
Vue.use(Vuex)

export default new Vuex.Store({
  // 使用模块
  modules: {
    cart,
    user
  }
})
