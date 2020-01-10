<template>
  <div class="box">
    <!-- <header>详情头部</header> -->
    <div class="count">
      <div class="detail-header">
        <i @click="toBack" class="iconfont icon-fanhui"></i>
      </div>
      <van-swipe indicator-color="blue">
        <van-swipe-item>
          <img style="width:100%;height:100%" :src= "proimg" >
        </van-swipe-item>
        <van-swipe-item>
          <img style="width:110%;height:110%" :src= "proimg" >
        </van-swipe-item>
      </van-swipe>
      <div class="detailMain">
        <div class="detailMain-name">
          <h3>{{ proname }}</h3>
          <span>￥{{ price }}</span>
        </div>
        <p @click.stop="is_sku=true">商品规格<i>></i></p>
        <p @click.stop="toComment">用户评价<i>></i><i class="proCommentNum">(&nbsp;{{ proCommentNum }}&nbsp;条&nbsp;)</i></p>
        <div class="detailMain-info">
          <h3>产品详情</h3>
          <p>{{ detail }}</p>
          <h3>产品细节</h3>
          <p>该款&nbsp;{{ proname }}&nbsp;细节图展示</p>
          <div>
            <img style="width:130%;height:100%" :src= "proimg">
          </div>
          <div>
            <img style="width:130%;height:100%;margin-left:-30%" :src= "proimg">
          </div>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart"/>
        <van-goods-action-button color="#707172" type="warning" text="加入购物车" @click.stop="is_sku=true" />
        <van-goods-action-button color="#000" type="danger" text="立即购买" @click.stop="addCart"/>
      </van-goods-action>
    </div>
    <div class="transition-mengceng">
      <transition name="fade">
        <div v-if="is_sku" class="megcengXia" @click.stop="is_sku=false">
          <div class="mengcengShang" @click.stop="is_sku=true">
            <i class="closeM" @click.stop="is_sku=false">X</i>
            <div class="m-img">
              <img :src= "proimg" >
              <h3>{{ proname }}</h3>
              <span>￥{{ price }}</span>
              <span>尺码:<i>{{ sel === '' ? itemList[0] : sel }}</i>码</span>
            </div>
            <div class="m-ma">
              <label for="ma">尺码</label>
              <div>
                <u :class="activeClass == index ? 'actived':''" v-for="(maItem,index) in itemList" :key="index" @click.stop="getMa(index)">
                      {{maItem}}
                </u>
              </div>
              <button class="subM"  @click="addCart">提交</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Swipe,
  SwipeItem,
  Toast
} from 'vant'

Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Toast)
  .use(Swipe).use(SwipeItem)
export default {
  data () {
    return {
      proimg: '',
      proname: '',
      price: '',
      proid: '',
      is_sku: false,
      itemList: [],
      activeClass: -1,
      sel: '',
      detail: '',
      type: '',
      proCommentNum: 0
    }
  },
  methods: {
    toBack () {
      this.$router.back()
    },
    getMa (index) {
      this.activeClass = index
      this.sel = this.itemList[index]
    },
    toCart () {
      this.$router.push('/cart')
    },
    addCart () {
      if (this.activeClass === -1) {
        Toast('请选择尺码')
      } else {
        axios.post('/api/cart/add', {
          token: localStorage.getItem('token'),
          userid: localStorage.getItem('userid'),
          proid: this.proid,
          num: 1,
          sel: this.sel,
          type: this.type
        }).then(res => {
          if (res.data.code === '10119') {
            Toast('请先登录')
            this.$router.push('/login')
          } else {
            Toast('加入购物车成功')
            this.$store.commit('changeFlag', true)
          }
        })
      }
    },
    onSubmit () {
      let arr = []
      this.cartlist.map(item => {
        if (item.flag) {
          arr.push(item)
        }
      })
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
    },
    toComment () {
      this.$router.push('/comment/' + this.proid)
      // this.$router.push('/comment')
    }
  },
  mounted () {
    let { proid } = this.$route.params
    axios.get('/api/pro/detail?proid=' + proid).then(res => {
      this.proimg = res.data.data.proimg
      this.proname = res.data.data.proname
      this.price = res.data.data.price
      this.proid = res.data.data.proid
      this.detail = res.data.data.detail
      this.itemList = res.data.data.sel.split('/')
      this.type = res.data.data.type
      this.commentList = res.data.data.list
      this.proCommentNum = this.commentList.length
    })
  }
}
</script>
<style lang="scss">
.box{
  .transition-mengceng{
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
  .count{
    height:100%;
    .detail-header{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 500;
      overflow: hidden;
      padding: 20px;
      font-size: 16px;
      border-radius: 0 0 15px 15px;
      i{
        float: left;
        background: rgba(122, 122, 122, 0.3);
        border-radius: 50%;
        padding:2px 6px;
        font-weight: 700;
      }
    }
  }
  .van-swipe{
    height: 60%;
    .van-swipe__indicators{
      .van-swipe__indicator:not(:last-child){
        margin: 0;
      }
      .van-swipe__indicator{
        width: 60px;
        height: 2px;
        border-radius: 0;
        background-color: black !important;
      }
    }
  }
  .detailMain{
    background: #fff;
    text-align: center;
    padding:25px 15px;
    .detailMain-name{
      h3{
        font-size: 20px;
        line-height: 40px;
      }
      span{
        font-size: 16px;
        line-height: 32px;
      }
    }
    p{
      width: 100%;
      padding: 0 15px;
      text-align: left;
      border-bottom: 1px solid gray;
      float: left;
      font-size: 15px;
      line-height: 30px;
      margin-bottom: 15px;
      i{
        float: right;
        &.proCommentNum{
          margin: 0 10px;
          font-size: 14px;
          color: #7e7e7e;
        }
      }
    }
    .detailMain-info{
      padding:40px 0 0 0;
      h3{
        font-size: 16px;
        line-height: 50px;
      }
      p{
        padding: 10px;
        margin-bottom: 20px;
      }
      div{
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 30px 0;
        img{
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
  .megcengXia{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .mengcengShang{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      .closeM{
        display: block;
        width: 100%;
        text-align: right;
        padding: 5px 10px;
      }
      .m-img{
        overflow:hidden;
        img{
          width:1rem;height:auto;float:left;
          margin: 0 10px;
        }
        h3{
          width:50%;float:left;margin-top:10px;
        }
        span{
          width:50%;float:left;margin-top:10px;
          i{
            font-size: 16px;
            padding: 5px;
          }
        }
      }
      .m-ma{
        .subM{
          width: 100%;
          border: none;
          background: #000;
          color: #fff;
          border-radius: 10px;
          letter-spacing: 6px;
          margin-top: 40px;
          padding: 8px;
        }
        label{
          display: block;
          margin: 20px 10px 10px;
        }
        div{
          u{
            border: 1px solid black;
            padding: 4px 10px;
            margin: 10px 0 10px 10px;
            &.actived{
              border-color: #b9bbbd;
              background-color: #b9bbbd;
            }
          }
        }
      }
    }
  }
}
</style>
