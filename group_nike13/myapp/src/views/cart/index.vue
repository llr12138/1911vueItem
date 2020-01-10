<template>
  <div class="box">
    <div class="cartlist-header">
      <i @click="toBack" class="iconfont icon-fanhui"></i>
      <u class="iconfont icon-fenxiang"></u>
    </div>
    <div class="count">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-if="flag" style="width:100%;height:100%;position:fixed;">
            <i class="iconfont icon-shopcart"></i>
            <div class="cartKong">
              <h4>购物车空空如也&nbsp;<router-link to="/home">去购物</router-link></h4>
            </div>
          </div>
          <cartlist v-else />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { mapState } from 'vuex'
import Cartlist from '@/components/CartList'
import { List, PullRefresh, Lazyload } from 'vant'

Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Lazyload)
export default {
  data () {
    return {
      prolist: [],
      flag: true,
      loading: false,
      finished: false,
      pageCode: 1,
      isLoading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('loginstate') === 'false') {
      next(vm => {
        vm.$router.go(0)
      })
      localStorage.setItem('loginstate', true)
    } else {
      next(vm => {
        vm.$router.replace('/cart')
      })
    }
  },
  computed: {
    ...mapState({
      cartlist: state => state.cart.cartlist,
      requestflag: state => state.cart.flag
    })
  },
  components: {
    Cartlist
  },
  created () {
    if (this.cartlist.length !== 0 && !this.requestflag) {
      // 状态管理器中有数据
      this.flag = false
    } else {
      // 没有数据 或者是 添加了需要重新请求数据
      this.flag = true
      this.$store.dispatch('getCartlist').then(data => {
        if (data === 1) {
          this.$router.push('/login')
        } else if (data === 2) {
          this.flag = true
        } else {
          this.flag = false
          this.$store.commit('changeFlag', false)
        }
      })
    }
  },
  methods: {
    toBack () {
      this.$router.back()
    },
    onLoad () {
      this.loading = true
      axios.get('/api/pro', {
        params: {
          pageCode: this.pageCode,
          limitNum: 5
        }
      }).then(res => {
        this.loading = false
        this.pageCode++ // 页面加1
        if (res.data.code === '10000') {
          this.finished = true
        } else {
          // 有数据 拼接数据
          this.prolist = [...this.prolist, ...res.data.data]
        }
      })
    },
    onRefresh () {
      // 下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。
      this.isLoading = true
      axios.get('/api/pro').then((res) => {
        this.isLoading = false
        this.prolist = res.data.data
        // 页码归1
        this.pageCode = 1
        this.finished = false
      })
    }
  }
}
</script>
<style lang="scss">
.cartlist-header{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 500;
      overflow: hidden;
      padding: 10px;
      font-size: 16px;
      background: rgba(122, 122, 122, 0.3);
      i{
        float: left;
        padding:2px 6px;
        font-weight: 700;
      }
      u{
        float: right;
        padding:2px 6px;
      }
    }
.icon-shopcart:before{
        color: gray;
        font-size:1rem;
        position: absolute;
        left:34%;
        top: 30%;
    }
.cartKong{
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
}
</style>
