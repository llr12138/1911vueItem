<template>
  <div class="box">
    <header class="header">购物车头部</header>
    <div class="content">
      <div v-if="flag">
        购物车空空如也
        <router-link to="/home">去购物</router-link>
      </div>
      <Cartlist v-else/>
    </div>
  </div>
</template>

<script>
// mapState 是vuex中组件获取状态管理器状态的一个辅助函数 --- 使用计算属性
// import { mapState } from 'vuex'
import Vue from 'vue'
import { Toast } from 'vant'
// import axios from 'axios'
import Cartlist from '@/components/CartList'
Vue.use(Toast)
export default {
  data () {
    return {
      flag: true
    }
  },
  components: {
    Cartlist
  },
  // computed: {
  //   ...mapState({
  //     cartlist: (state) => {
  //       console.log(state)
  //       return state.cart.cartlist
  //     }
  //   })
  // },
  created () {
    console.log(this.$store)
    this.$store.dispatch('getCartlist').then(data => {
      if (data === 1) {
        Toast('未登录')
        this.$router.push('/login')
      } else if (data === 2) {
        this.flag = true
      } else {
        this.flag = false
      }
    })
  }
}
</script>
