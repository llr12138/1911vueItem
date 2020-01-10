<template>
  <div class="box1">
    <header class="orderHeader">
      <div class="back" @click="back">返回</div>
      <p>订单中心</p>
      <div class="empty">&nbsp;&nbsp;</div>
    </header>
    <div class="content">
      <Ordercenterlist :allorder="allorder"></Ordercenterlist>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Ordercenterlist from '@/components/Ordercenterlist'
export default {
  data () {
    return {
      allorder: []
    }
  },
  components: {
    Ordercenterlist
  },
  created () {
    axios.get('/api/order', {
      params: {
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid')
      }
    }).then(res => {
      console.log(999999999)
      console.log(res.data)
      console.log(res.data.data)
      this.allorder = res.data.data
      console.log(this.allorder)
    })
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
@import "@/lib/reset.scss";
  html, body, .box1 {
    widows: 100%;
    height: 100%;
  }
  .box1 {
    @include flexbox();
    @include flex-direction(column);
    justify-content: space-between;
    @include align-items();
    // overflow: auto;
    .orderHeader {
      background-color: #eee;
      @include rect(100%, 0.5rem);
      text-align: center;
      font: bold .16rem/.50rem "宋体";
      border-bottom: 1px solid #666;
      display: flex;
      justify-content: space-between;
    }
    .content {
      @include flex();
      @include rect(100%, auto);
      overflow: auto;
    }
  }
</style>
