<template>
  <div class="box2">
  <van-tabs v-model="active">
    <van-tab title="全部订单">
      <div v-if="!flag">
        <p>您还没有订单，赶快去<span @click="backhome">购物吧</span></p>
      </div>
      <div v-else>
        <!-- <div class="orderbox">
          <div class="boxheader">
            <h2>订单id:</h2>
            <h3>待付款</h3>
          </div>
          <ul class="boxcontent">
            <li class="g-clear">
              <div class="img">
                <img src="" alt="#">
              </div>
              <div class="info">
                <h4>name</h4>
                <h5>price</h5>
              </div>
              <p>num</p>
            </li>
            <li class="g-clear">
              <div class="img">
                <img src="" alt="#">
              </div>
              <div class="info">
                <h4>name</h4>
                <h5>price</h5>
              </div>
              <p>num</p>
            </li>
          </ul>
          <div class="boxfooter g-clear">
            <button>去付款</button>
          </div>
        </div> -->
        <div class="orderbox" v-for="(item, index) of allorder" :key="index">
          <div class="boxheader">
            <h2>订单：{{ item.orderid }}</h2>
            <h3 v-show="item.status === 0">待付款</h3>
            <h3 v-show="item.status === 1">待发货</h3>
            <h3 v-show="item.status === 2">待收货</h3>
            <h3 v-show="item.status === 3">待评价</h3>
            <h3 v-show="item.status === 4">交易成功</h3>
          </div>
          <ul class="boxcontent">
            <li class="g-clear" v-for="(item1, index1) of item.list" :key="index1">
              <div class="img">
                <img :src="item1.proimg" alt="#">
              </div>
              <div class="info">
                <h4>{{item1.proname}}</h4>
                <h5>{{ item1.price }}</h5>
              </div>
              <p>{{ item1.num }}</p>
            </li>
          </ul>
          <div class="boxfooter g-clear">
            <!-- <button>去付款</button> -->
            <button v-show="item.status === 0" @click="pay(item.orderid)">去付款</button>
            <!-- <button v-show="item.status === 1">待发货</button> -->
            <button v-show="item.status === 2" @click="receipt(item.orderid)">确认收货</button>
            <button v-show="item.status === 3" @click="comment(item.orderid)">去评价</button>
            <!-- <button v-show="item.status === 4">交易成功</button> -->
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="待付款">
      <!-- <div v-if="!flag">
      </div> -->
      <div>
        <div class="orderbox" v-for="(item, index) of allorder.filter(item => item.status === 0)" :key="index">
          <div class="boxheader">
            <h2>订单：{{ item.orderid }}</h2>
            <h3 v-show="item.status === 0">待付款</h3>
            <h3 v-show="item.status === 1">待发货</h3>
            <h3 v-show="item.status === 2">待收货</h3>
            <h3 v-show="item.status === 3">待评价</h3>
            <h3 v-show="item.status === 4">交易成功</h3>
          </div>
          <ul class="boxcontent">
            <li class="g-clear" v-for="(item1, index1) of item.list" :key="index1">
              <div class="img">
                <img :src="item1.proimg" alt="#">
              </div>
              <div class="info">
                <h4>{{item1.proname}}</h4>
                <h5>{{ item1.price }}</h5>
              </div>
              <p>{{ item1.num }}</p>
            </li>
          </ul>
          <div class="boxfooter g-clear">
            <!-- <button>去付款</button> -->
            <button v-show="item.status === 0" @click="pay(item.orderid)">去付款</button>
            <!-- <button v-show="item.status === 1">待发货</button> -->
            <button v-show="item.status === 2" @click="receipt(item.orderid)">确认收货</button>
            <button v-show="item.status === 3" @click="comment(item.orderid)">去评价</button>
            <!-- <button v-show="item.status === 4">交易成功</button> -->
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="待发货">
      <div v-if="!flag">
      </div>
      <div v-else>
        <div class="orderbox" v-for="(item, index) of allorder.filter(item => item.status === 1)" :key="index">
          <div class="boxheader">
            <h2>订单：{{ item.orderid }}</h2>
            <h3 v-show="item.status === 0">待付款</h3>
            <h3 v-show="item.status === 1">待发货</h3>
            <h3 v-show="item.status === 2">待收货</h3>
            <h3 v-show="item.status === 3">待评价</h3>
            <h3 v-show="item.status === 4">交易成功</h3>
          </div>
          <ul class="boxcontent">
            <li class="g-clear" v-for="(item1, index1) of item.list" :key="index1">
              <div class="img">
                <img :src="item1.proimg" alt="#">
              </div>
              <div class="info">
                <h4>{{item1.proname}}</h4>
                <h5>{{ item1.price }}</h5>
              </div>
              <p>{{ item1.num }}</p>
            </li>
          </ul>
          <div class="boxfooter g-clear">
            <!-- <button>去付款</button> -->
            <button v-show="item.status === 0" @click="pay(item.orderid)">去付款</button>
            <!-- <button v-show="item.status === 1">待发货</button> -->
            <button v-show="item.status === 2" @click="receipt(item.orderid)">确认收货</button>
            <button v-show="item.status === 3" @click="comment(item.orderid)">去评价</button>
            <!-- <button v-show="item.status === 4">交易成功</button> -->
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="待收货">
      <div v-if="!flag">
      </div>
      <div v-else>
        <div class="orderbox" v-for="(item, index) of allorder.filter(item => item.status === 2)" :key="index">
          <div class="boxheader">
            <h2>订单：{{ item.orderid }}</h2>
            <h3 v-show="item.status === 0">待付款</h3>
            <h3 v-show="item.status === 1">待发货</h3>
            <h3 v-show="item.status === 2">待收货</h3>
            <h3 v-show="item.status === 3">待评价</h3>
            <h3 v-show="item.status === 4">交易成功</h3>
          </div>
          <ul class="boxcontent">
            <li class="g-clear" v-for="(item1, index1) of item.list" :key="index1">
              <div class="img">
                <img :src="item1.proimg" alt="#">
              </div>
              <div class="info">
                <h4>{{item1.proname}}</h4>
                <h5>{{ item1.price }}</h5>
              </div>
              <p>{{ item1.num }}</p>
            </li>
          </ul>
          <div class="boxfooter g-clear">
            <!-- <button>去付款</button> -->
            <button v-show="item.status === 0" @click="pay(item.orderid)">去付款</button>
            <!-- <button v-show="item.status === 1">待发货</button> -->
            <button v-show="item.status === 2" @click="receipt(item.orderid)">确认收货</button>
            <button v-show="item.status === 3" @click="comment(item.orderid)">去评价</button>
            <!-- <button v-show="item.status === 4">交易成功</button> -->
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="待评价">
      <div v-if="!flag">
      </div>
      <div v-else>
        <div class="orderbox" v-for="(item, index) of allorder.filter(item => item.status === 3)" :key="index">
          <div class="boxheader">
            <h2>订单：{{ item.orderid }}</h2>
            <h3 v-show="item.status === 0">待付款</h3>
            <h3 v-show="item.status === 1">待发货</h3>
            <h3 v-show="item.status === 2">待收货</h3>
            <h3 v-show="item.status === 3">待评价</h3>
            <h3 v-show="item.status === 4">交易成功</h3>
          </div>
          <ul class="boxcontent">
            <li class="g-clear" v-for="(item1, index1) of item.list" :key="index1">
              <div class="img">
                <img :src="item1.proimg" alt="#">
              </div>
              <div class="info">
                <h4>{{item1.proname}}</h4>
                <h5>{{ item1.price }}</h5>
              </div>
              <p>{{ item1.num }}</p>
            </li>
          </ul>
          <div class="boxfooter g-clear">
            <!-- <button>去付款</button> -->
            <button v-show="item.status === 0" @click="pay(item.orderid)">去付款</button>
            <!-- <button v-show="item.status === 1">待发货</button> -->
            <button v-show="item.status === 2" @click="receipt(item.orderid)">确认收货</button>
            <button v-show="item.status === 3" @click="comment(item.orderid)">去评价</button>
            <!-- <button v-show="item.status === 4">交易成功</button> -->
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Tab, Tabs, Toast } from 'vant'
Vue.use(Tab).use(Tabs)
Vue.use(Toast)
export default {
  props: {
    allorder: {
      type: Array
    }
  },
  data () {
    return {
      active: 0
      // allorder0: this.allorder.filter(item => item.status === 0),
      // allorder1: this.allorder.filter(item => item.status === 1),
      // allorder2: this.allorder.filter(item => item.status === 2),
      // allorder3: this.allorder.filter(item => item.status === 3)
    }
  },
  computed: {
    flag () {
      if (this.allorder) {
        return true
      }
      return false
    }
  },
  methods: {
    backhome () {
      this.$router.push('/home')
    },
    pay (orderid) {
      this.$router.replace('/alipay/' + orderid)
    },
    receipt (orderid) {
      axios.post('/api/order/updatepaystatus', {
        token: localStorage.getItem('token'),
        orderid,
        status: 3
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        } else if (res.data.code === '33302') {
          Toast('收货失败')
        } else {
          Toast('收货成功')
          this.$router.go(0)
        }
      })
    },
    comment (orderid) {
      this.$router.push('/commentInput/' + orderid)
    }
  }
}
</script>

<style lang="scss">
@import "@/lib/reset.scss";
.orderbox {
  font:.16rem/.50rem "宋体";
  text-align: left;
  margin: .15rem;
  border-bottom: 1px solid #999;
  .boxheader {
    @include flexbox();
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    h2 {
      width: 60%;
      height: .5rem;
      overflow: hidden;
      font:bold .18rem/.50rem "宋体";
    }
    h3 {
      height: .5rem;
      font: bold .16rem/.50rem "宋体";
      color:orange;
    }
  }
  .boxcontent {
    margin: .2rem 0 0 0;
    li {
      margin: .1rem 0 0 0;
      .img {
        float: left;
        width: 1rem;
        height: 1rem;
        background: #eee;
        img {
          width: 1rem;
          height: 1rem;
        }
      }
      .info {
        float: left;
        margin: 0 0 0 .1rem;
        h4, h5 {
          width: 1rem;
          height: .5rem;
          overflow: hidden;
        }
      }
      p {
        float: right;
        font: bold .16rem/.50rem "宋体";
      }
    }
  }
  .boxfooter {
    margin: .1rem 0;
    button {
      float: right;
      height: .3rem;
      width: 1rem;
      text-align: center;
      font: bold .16rem/.30rem "宋体";
      color: #fff;
      background: red;
      border-radius: .5rem;
    }
  }
}
</style>
