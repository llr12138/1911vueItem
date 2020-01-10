<template>
  <div class="box">
    <header class="header">购物车头部</header>
    <div class="content">
      <div v-if="flag">
        购物车空空如也
        <router-link to="/home">去购物</router-link>
      </div>
      <Cartlist v-else :cartlist = "cartlist"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import axios from 'axios'
import Cartlist from '@/components/CartList'
Vue.use(Toast)
export default {
  data () {
    return {
      cartlist: [],
      flag: true
    }
  },
  components: {
    Cartlist
  },
  created () {
    axios.get('/api/cart', {
      params: {
        userid: localStorage.getItem('userid'),
        token: localStorage.getItem('token')
      }
    }).then(res => {
      if (res.data.code === '10119') {
        Toast('还未登录')
        this.$router.push('/login')
      } else if (res.data.code === '10012') {
        Toast('购物车空空如也')
        this.flag = true
      } else {
        this.flag = false
        console.log(res.data)
        // 给每一项数据添加一个字段，表示你是选中的
        res.data.data.map(item => {
          item.flag = true
        })
        this.cartlist = res.data.data
      }
    })
  }
}
</script>
