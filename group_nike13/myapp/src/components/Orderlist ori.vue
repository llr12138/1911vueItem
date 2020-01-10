<template>
  <div>
    <div>
      <h1>收货人信息</h1>
      <div v-if="!flag" @click="getAddressList">
        添加地址
      </div>
      <div v-else @click="getAddressList">
        {{ username }} {{ tel }} {{ address }}
      </div>
    </div>
    <ul class="prolist">
      <li class="item" v-for="(item) of orderlist" :key="item.proid">
        <div class="itemimg">
          <img :src="item.proimg" alt="">
        </div>
        <div class="iteminfo">
          <h3>{{ item.proname }}</h3>
          <p>{{ item.price }}</p>
          {{item.num}}
        </div>
      </li>
    </ul>
    <textarea v-model="note" placeholder="请输入您的特殊需求"></textarea>
    <van-submit-bar
      :price="totalPrice"
      button-text="确认订单"
      @submit="onSubmit"
    >
      <span v-if="!flag" slot="tip" style="color: #666">
        请先添加收货人地址, <span style="color: #f00">立即添加</span>
      </span>
       <span v-else slot="tip" style="color: #666">
        {{ username }} {{ tel }} {{ address }}
      </span>
    </van-submit-bar>
  </div>
</template>
<script>
import Vue from 'vue'
import { SubmitBar, Toast } from 'vant'
import axios from 'axios'
Vue.use(SubmitBar)
Vue.use(Toast)
export default {
  props: {
    orderlist: {
      type: Array
    }
  },
  data () {
    return {
      flag: false,
      username: '',
      tel: '',
      address: '',
      note: ''
    }
  },
  mounted () {
    // 请求地址
    // 如果请求的地址为空，显示添加地址
    // 如果不为空，显示默认地址，如果没有默认地址，显示第一个地址
    axios.get('/api/address', {
      params: {
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid')
      }
    }).then(res => {
      if (res.data.code === '10119') {
        Toast('请先登录')
        this.$router.push('/login')
      } else {
        if (res.data.code === '10017') {
          Toast('还未添加收获地址')
          this.flag = false
        } else {
          console.log(res.data.data)
          this.flag = true
          let arr = [] // 查询默认地址
          res.data.data.map(item => {
            if (item.flag === 1) {
              arr.push(item)
            }
          })
          if (arr.length === 0) {
            // 没有默认地址
            console.log('没有默认地址')
            this.username = res.data.data[0].username
            this.tel = res.data.data[0].tel
            this.address = res.data.data[0].address
          } else {
            // 有默认地址
            console.log('有默认地址')
            console.log(arr)
            this.username = arr[0].username
            this.tel = arr[0].tel
            this.address = arr[0].address
          }
        }
      }
    })
    // 请求地址，有没有默认地址，没有显示添加地址，有就显示地址
  },
  computed: {
    totalPrice () {
      let totalPrice = 0
      this.orderlist.map(item => {
        totalPrice += item.num * item.price
      })
      return totalPrice * 100
    }
  },
  methods: {
    onSubmit () {
      if (this.flag) {
        console.log('确认订单')
        let cartidarr = []
        this.orderlist.map(item => {
          cartidarr.push(item.cartid)
        })
        // 依据cartid 删除购物车中的数据
        // 提交收件人信息以及备注修改订单
        axios.post('/api/order/updateOrder', {
          token: localStorage.getItem('token'),
          orderid: this.$route.params.orderid,
          cartidarr,
          username: this.username,
          tel: this.tel,
          address: this.address,
          note: this.note
        }).then(res => {
          if (res.data.code === '10119') {
            Toast('请先登录')
            this.$router.push('/login')
          } else {
            Toast('确认订单')
            this.$router.replace('/pay/' + this.$route.params.orderid)
          }
        })
      } else {
        Toast('请先添加地址')
      }
    },
    getAddressList () {
      this.$router.push('/addresslist')
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.prolist {

  .item {
    @include rect(100%, 1rem);
    @include flexbox();
    @include border(0 0 1px 0, #ccc, solid);
    .itemimg {
      @include rect(1rem, 1rem);
      img {
        @include rect(.9rem, .9rem);
        @include background-color(#f66);
        @include display(block);
        @include margin(0.05rem);
      }
    }
    .iteminfo {
      @include flex();
    }
  }
}
</style>
