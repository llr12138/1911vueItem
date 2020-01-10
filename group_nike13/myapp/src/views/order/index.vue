<template>
  <div class="box1">
    <header class="orderHeader">
      请确认完善订单信息
    </header>
    <div class="content">
      <Orderlist :orderall = "orderall"></Orderlist>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Orderlist from '@/components/Orderlist'
export default {
  data () {
    return {
      orderall: {}
    }
  },
  components: {
    Orderlist
  },
  created () {
    let { orderid } = this.$route.params
    axios.get('/api/order/detail', {
      params: {
        token: localStorage.getItem('token'),
        orderid
      }
    }).then(res => {
      console.log(res.data)
      this.orderall = res.data.data
      console.log(this.orderall)
    })
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
    }
    .content {
      @include flex();
      @include rect(100%, auto);
      overflow: auto;
    }
  }
</style>
