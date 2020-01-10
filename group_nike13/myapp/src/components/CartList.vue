<template>
  <div>
    <ul class="prolist" style="padding-top: 50px;">
      <li class="item" v-for="(item,index) of cartlist" :key="index">
        <!-- <van-checkbox v-model="item.flag" @change="selectItem(item.flag)"></van-checkbox> -->
        <input type="checkbox" class="magic-checkbox" :id="index"  v-model="item.flag" @change="selectItem(item)">
        <label :for="index"></label>
        <div class="itemimg">
          <img :src="item.proimg" alt="" @click="toDetail(item.proid)">
        </div>
        <div class="iteminfo">
          <h3>{{ item.proname }}</h3>
          <div>￥{{ item.price }}<u>尺码：<span>{{ item.sel }}</span></u></div>
          <i @click.stop="reduceNum(item,index)">-</i>
          <i>{{ item.num }}</i>
          <i @click.stop="addNum(item)">+</i>
          <span class="iconfont icon-shanchu1" @click.stop="deleteItem(item.cartid, index)"></span>
        </div>
      </li>
    </ul>
    <div class="cartRecommend">
      <h3>—&nbsp;<span>为你推荐</span>&nbsp;—</h3>
      <ul>
        <li v-for="item of cartRecommend" @click="toDetail(item.proid)"  :key="item.proid">
          <img :src="item.proimg" alt="">
        </li>
      </ul>
    </div>
    <div class="cartSubmitBar">
      <van-submit-bar
        :price="totalPrice"
        button-text="确认购买"
        @submit="onSubmit"
      >
      <input type="checkbox" class="magic-checkbox" id="c1" v-model="allChecked" @change="selectAll">
    <label class="cartAllCheck" for="c1">全选</label>
      <!-- <p>总价: {{ totalPrice }}</p>
      <p>总数量: {{ totalNum }}</p>
      <button>提交订单</button> -->
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { Checkbox, CheckboxGroup, Toast, SubmitBar } from 'vant'

Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Toast)
Vue.use(SubmitBar)
export default {
  data () {
    return {
      allChecked: '',
      cartRecommend: [],
      type: '',
      jisuan: ''
    }
  },
  mounted () {
    let bool = this.cartlist.every(item => item.flag === true)
    bool ? this.allChecked = true : this.allChecked = false
    this.type = this.cartlist[this.cartlist.length - 1].type
    axios.get('/pro/witchtype?type=' + this.type).then((res) => {
      this.cartRecommend = res.data.data
    })
  },
  computed: {
    ...mapState({
      cartlist: state => state.cart.cartlist
    }),
    ...mapGetters({
      // this.$store.getters.totalNumber
      totalNumber: 'totalNumber',
      totalPrice: 'totalPrice'
    })
  },
  methods: {
    toDetail (proid) {
      this.$router.push({ path: '/detail/' + proid })
    },
    addNum (item) {
      if (!this.$store.state.user.loginstate) {
        this.$router.push('/login')
        return
      }
      this.$store.dispatch('addNum', { item }).then(data => {
        if (data === 1) {
          this.$router.push('/login')
        } else {
          item.num += 1
        }
      })
    },
    reduceNum (item) {
      if (item.num === 1) {
        return
      }
      if (!this.$store.state.user.loginstate) {
        this.$router.push('/login')
        return
      }
      this.$store.dispatch('reduceNum', { item }).then(data => {
        if (data === 1) {
          this.$router.push('/login')
        } else {
          item.num -= 1
        }
      })
    },
    deleteItem (cartid, index) {
      this.$store.dispatch('deleteItem', { cartid, index }).then(data => {
        if (data.data === 1) {
          this.$router.push('/login')
        } else {
        }
      })
    },
    selectAll () {
      let arr = this.cartlist
      if (this.allChecked) {
        arr.map(item => {
          item.flag = true
        })
      } else {
        arr.map(item => {
          item.flag = false
        })
      }
      this.$store.commit({
        type: 'changeCartlist',
        data: arr
      })
    },
    selectItem (item) {
      if (item.flag) {
        let bool = this.cartlist.every(item => item.flag === true)
        if (bool) {
          this.allChecked = true
        } else {
          this.allChecked = false
        }
      } else {
        this.allChecked = false
      }
    },
    onSubmit () {
      // 1、拿到那些产品被选中
      let arr = []
      this.cartlist.map(item => {
        if (item.flag) {
          arr.push(item)
        }
      })
      if (arr.length !== 0) {
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
      } else {
        Toast('请选择商品')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.prolist {
  .item {
    label{
      margin: 0px 0px 20px 15px;
    }
    align-items: center;
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
      margin-left: 10px;
      div{
        font-weight: 700;
        u{
          padding-left: 20px;
        }
      }
      i{
        @include border(1px,rgb(117, 117, 117), solid);
        padding:2px 10px;
        margin: 10px 0;
      }
      .icon-shanchu1:before{
        font-size:.2rem;
        margin: 30px;
      }
    }
  }
}
.cartRecommend {
  padding: 10px;
  h3{
    color: rgb(88, 87, 87);
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 5px;
    span{
      font: 14px/32px "";
      color: rgb(88, 87, 87);
    }
  }
  width: 100%;
  ul{
    width: 100%;
    overflow: hidden;
    li{
      width: 50%;
      padding: 7px;
      float: left;
      img{
        width: 100%;
      }
    }
  }
}
.cartSubmitBar{
  .van-button--danger{
    background: #313030;
    border-color: #313030;
  }
  .van-button__text{
    color:white;
  }
}
.cartAllCheck{
  margin: 10px;
}
</style>
