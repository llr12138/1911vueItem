<template>
  <div class="box">
    <header class="header">提交订单</header>
    <div class="content">
      <Orderlist :orderlist = "orderlist"></Orderlist>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Orderlist from '@/components/Orderlist'
export default {
  data () {
    return {
      orderlist: []
    }
  },
  components: {
    Orderlist
  },
  mounted () {
    let { orderid } = this.$route.params
    axios.get('/api/order/detail', {
      params: {
        token: localStorage.getItem('token'),
        orderid
      }
    }).then(res => {
      console.log(res.data)
      this.orderlist = res.data.data.list
    })
  }
}
</script>
