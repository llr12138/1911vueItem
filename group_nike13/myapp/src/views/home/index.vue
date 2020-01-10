<template>
  <div class="box">
    <header class="header">
      <div class="logo">
        <img src="../../../public/img/logo.png" alt="">
      </div>
      <div class="search">
        <i @click="goSearch" class="iconfont icon-sousuo"></i>
      </div>
      <div class="shopcar">
        <i @click="goCart" class="iconfont icon-gouwuche"></i>
      </div>
      <div class="menu" @click="goUser">
        <i class="iconfont icon-icon-test"></i>
      </div>
      </header>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <Prolist :prolist="prolist" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { List, PullRefresh, Swipe, SwipeItem, Lazyload } from 'vant'
import axios from 'axios'
import Prolist from '@/components/Prolist'
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Lazyload)
Vue.use(Swipe).use(SwipeItem)
export default {
  data () {
    return {
      images: [
        'https://c.static-nike.com/a/images/w_1920,c_limit/3e43957f-ad6e-4892-8b7e-51e729ec8bf8/image.jpg',
        'https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/3c58409fa2fb681de65129d0559618d2_254_96.jpg'
      ],
      prolist: [],
      loading: false,
      finished: false,
      pageCode: 1,
      isLoading: false
    }
  },
  components: {
    Prolist
  },
  created () {
    axios.get('/api/pro').then((res) => {
      this.prolist = res.data.data
    })
  },
  methods: {
    goUser () {
      this.$router.push('/user')
    },
    goSearch () {
      this.$router.push('/search')
    },
    goCart () {
      this.$router.push('/cart')
    },
    onLoad () {
      // List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时，会触发load事件并将loading设置成true。此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。若数据已全部加载完毕，则直接将finished设置成true即可。
      console.log('上拉加载开始')
      this.loading = true
      axios.get('/api/pro', {
        params: {
          pageCode: this.pageCode,
          limitNum: 10
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
.van-swipe {
  height: 180px;
  img {
    width: 100%;
  }
}
.search {
  margin-left: 2.6rem;
  margin-top:-0.2rem
}
.shopcar{
  margin-left:2.9rem;
  margin-top: -0.25rem
}
.menu{
  margin-left:3.2rem;
  margin-top: -0.25rem
}
</style>
