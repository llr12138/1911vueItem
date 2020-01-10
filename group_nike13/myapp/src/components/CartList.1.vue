<template>
  <div>
    <input type="checkbox" v-model="allChecked" @change="selectAll"> 全选
    <ul class="prolist">
      <li class="item" v-for="(item, index) of cartlist" :key="item.proid">
        <input type="checkbox" v-model="item.flag" @change.stop="selectItem(item)">
        <div class="itemimg">
          <img :src="item.proimg" alt="">
        </div>
        <div class="iteminfo">
          <h3>{{ item.proname }}</h3>
          <p>{{ item.price }}</p>
          <button @click.stop="add(item)">+</button>
          {{item.num}}
          <button @click.stop="reduce(item)">-</button>
          <button @click.stop="deleteItem(item.cartid, index)">删除</button>
        </div>
      </li>
    </ul>
    <div>
      <p>总价： {{ totalPrice }}</p>
      <p>总数量：{{totalNumber}}</p>
      <button @click="submitOrder">提交订单</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
import { Toast } from 'vant'
import axios from 'axios'
Vue.use(Toast)
export default {
  data () {
    return {
      allChecked: true
    }
  },
  computed: {
    ...mapState({
      cartlist: state => state.cart.cartlist
    }),
    ...mapGetters({
      // this.$store.getters.totalNumber
      totalNumber: 'totalNumber'
    }),
    totalPrice () {
      // 初始值
      let totalPrice = 0
      // 遍历数据，累加数据
      this.cartlist.map(item => {
        item.flag ? totalPrice += item.num * item.price : totalPrice += 0
      })
      // 返回总数
      return totalPrice
    }
  },
  methods: {
    toDetail (proid) {
      this.$router.push({ path: '/detail/' + proid })
    },
    add (item) {
      axios.get('/api/cart/update', {
        params: {
          token: localStorage.getItem('token'),
          cartid: item.cartid,
          num: item.num + 1
        }
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('还未登录')
          this.$router.push('/login')
        } else {
          Toast('更新成功')
          item.num += 1 // 数据的改变引起视图的二次渲染
        }
      })
    },
    reduce (item) {
      if (item.num >= 2) {
        axios.get('/api/cart/update', {
          params: {
            token: localStorage.getItem('token'),
            cartid: item.cartid,
            num: item.num - 1
          }
        }).then(res => {
          if (res.data.code === '10119') {
            Toast('还未登录')
            this.$router.push('/login')
          } else {
            Toast('更新成功')
            item.num -= 1 // 数据的改变引起视图的二次渲染
          }
        })
      } else {
        item.num = 1
      }
    },
    deleteItem (cartid, index) {
      axios.get('/api/cart/delete', {
        params: {
          token: localStorage.getItem('token'),
          cartid
        }
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('还未登录')
          this.$router.push('/login')
        } else {
          Toast('删除成功')
          // 改变列表的数据
          this.cartlist.splice(index, 1)
        }
      })
    },
    selectAll () {
      console.log(this.allChecked)
      // 点击全选，全部选中修改数据
      if (this.allChecked) {
        this.cartlist.map(item => {
          item.flag = true
        })
      } else {
        this.cartlist.map(item => {
          item.flag = false
        })
      }
    },
    selectItem (item) {
      // 如果单个不被选中，那么全选一定没有被选中
      if (item.flag) {
        // 当前点击的这个是被选中的,遍历数据查看其余的是不是被选中
        // 如果所有的都已经被选中了，那么全选就被选中，否则不被选中
        let test = this.cartlist.every(item => {
          return item.flag === true
        })
        if (test) {
          this.allChecked = true
        } else {
          this.allChecked = false
        }
      } else {
        // 当前点击的这个是没有被选中的,全选一定没有被选中
        this.allChecked = false
      }
    },
    submitOrder () {
      console.log('提交订单')
      // 1、拿到那些产品被选中
      let arr = []
      this.cartlist.map(item => {
        if (item.flag) {
          arr.push(item)
        }
      })
      // 2、提交数据
      axios.post('/api/order/add', {
        userid: localStorage.getItem('userid'),
        token: localStorage.getItem('token'),
        list: JSON.stringify(arr)
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('还未登录')
          this.$router.push('/login')
        } else {
          Toast('提交订单成功')
          // 跳转到确认订单页面，传入订单号
          this.$router.push('/order/' + res.data.data)
        }
      })
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
