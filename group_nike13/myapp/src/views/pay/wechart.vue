<template>
  <div class="box4">
    <header class="header">请付款</header>
    <div class="content">
      <h1>正在前往微信app。。。</h1>
      <h2>如未能成功跳转，请长按保存以下二维码，在微信app中识别</h2>
      <div class="QRcode">
        <img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg" alt="#">
      </div>
      <p @click="changePay">切换到支付宝支付</p>
      <button @click="sucessOrder">支付完成</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  methods: {
    changePay () {
      this.$router.replace('/alipay/' + this.$route.params)
    },
    sucessOrder () {
      axios.post('/api/order/updatepaystatus', {
        token: localStorage.getItem('token'),
        // orderid: this.$route.params,
        orderid: this.$route.params.orderid,
        paytype: 'wechart',
        status: 1
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        } else if (res.data.code === '33333') {
          console.log('订单付款失败')
          this.$router.push('/home')
        } else {
          Toast('订单付款成功')
          localStorage.setItem('loginstate', false)
          // this.$router.push('/cart')
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "@/lib/reset.scss";
  .box4 {
    font: .16rem/.24rem '宋体';
    margin: .4rem .2rem .2rem .2rem;
    text-align: center;
    .header {
      font: bold .18rem/.24rem '微软雅黑';
      text-align: left;
    }
    .content {
      h1 {
        margin: .4rem 0 .6rem 0;
        font: bold .14rem/.20rem '宋体';
      }
      h2 {
        margin: .2rem 0 .2rem 0;
        font: .14rem/.20rem '宋体';
      }
      .QRcode {
        width: 5 rem;
        height: 1.5rem;
        margin: .1rem auto;
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      p {
        margin: .2rem 0 .2rem 0;
        color: red;
        font: .12rem/.20rem '宋体';
      }
      button {
        width: 3rem;
        height: .4rem;
        font: bold .16rem/.40rem '宋体';
        border-radius: .8rem;
        background-color: #333;
        color: #fff;
        margin: .4rem 0 0 0;
      }
    }
  }
</style>
