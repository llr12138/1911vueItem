<template>
  <div class="box">
    <div class="content">
      <div v-if="flag">
        <div class="header-login"><button class="backage" @click="backage">&times;</button></div>
        <div class="init">
          <img src="../../../public/img/face.jpg" alt="">
          <div class="name">{{ username }}</div>
          <a class="logout" @click="logout">注销</a>
        </div>
        <div class="user van" @click="sets"><span>账户</span><img src="../../../public/img/right.png" alt=""></div>
        <div class="secret van"><span>隐私</span><img src="../../../public/img/right.png" alt=""></div>
        <div class="adress van"><span>地址</span><img src="../../../public/img/right.png" alt=""></div>
        <div class="share van"><span>分享</span><img src="../../../public/img/right.png" alt=""></div>
        <div class="emils van"><span>信息</span><img src="../../../public/img/right.png" alt=""></div>
        <div class="connect van" @click="ordercenter"><span>我的订单</span><img src="../../../public/img/right.png" alt=""></div>
      </div>
      <div v-else>
        <div class="header-login"><button class="backage" @click="backage">&times;</button></div>
        <div class="show">登录NIKE账号</div>
        <img class="face" src="../../../public/img/face.jpg" alt=""><br/>
        <div class="login">还未登录，请先<router-link to="/login" tag="a">登录</router-link></div>
        <div class="register">还未加入我们？请去<router-link to="/register" tag="a">注册</router-link></div>
      </div>
    </div>
  </div>
</template>
<script>
// 如果本地存在userid和token，后端校验是否正确，正确返回用户信息，不正确说明未登录
// 如果不存在userid和token,说明用户肯定没有登陆
import axios from 'axios'
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
Vue.use(Tab).use(Tabs)
export default {
  data () {
    return {
      flag: false,
      username: ''
    }
  },
  mounted () {
    axios.get('/api/users/getInfo', {
      params: {
        userid: localStorage.getItem('userid'),
        token: localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.code === '10119') {
        // this.$router.push('/login')
        this.flag = false
      } else {
        this.flag = true
        this.username = res.data.data.username
      }
    })
  },
  methods: {
    backage () {
      this.$router.push('/home')
    },
    onClick (name, title) {
      // this.$toast(title)
    },
    logout () {
      localStorage.token = ''
      this.$router.push('/login')
    },
    sets () {
      this.$router.push('/sets')
    },
    ordercenter () {
      this.$router.push('/ordercenter')
    }
  }
}
</script>
<style lang="scss">
.container .box {
  width: 101%;
}
.content {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.van-swipe {
  height: 180px;
  img {
    width: 100%;
  }
}
.search {
  margin-left: 3rem;
  margin-top:-0.2rem
}
.shopcar{
  margin-left:3.4rem;
  margin-top: -0.25rem
}
.van {
    width: 100%;
  height: .5rem;
  border-bottom: .01rem solid #e5e5e5;
  margin-bottom: .05rem;
  background: #fff;
  img {
    float: right;
    margin: .1rem .1rem 0 0;
  }
    span {
    margin-left: .4rem;
    font-size: .16rem;
    line-height: .5rem;
  }
}
.user {
  background: url(../../../public/img/sets.png) left no-repeat;
}
.secret {
  background: url(../../../public/img/secret.png) left no-repeat;
}
.adress {
  background: url(../../../public/img/adress.png) left no-repeat;
}
.emils {
  background: url(../../../public/img/emil.png) left no-repeat;
}
.share {
  background: url(../../../public/img/share.png) left no-repeat;
}
.connect {
  background: url(../../../public/img/connect.png) left no-repeat;
}
.van-tabs__line {
  background-color: #7d7e80;
  height: .02rem;
}
.van-tab {
  color: #111;
  font-size: .16rem;
}
.van-tabs__wrap {
  margin-bottom: .4rem;
}
.face {
  border-radius:50%;
  width: 1.5rem;
  height: 1.5rem;
  margin:.2rem 29%;
}
.login {
  color: #8d8d8d;
  line-height: 30px;
  width: 100%;
  font-size:12px;
  text-align: center;
  margin:20px auto;
  a{
    color:#111;
    text-decoration:underline
  }
}
.register {
  color: #8d8d8d;
  line-height: 30px;
  width: 100%;
  font-size:12px;
  text-align: center;
  position: absolute;
  a{
    color:#111;
    text-decoration:underline
  }
}
.header-login{
  width: 100%;
  height: 1.2rem;
  background: url(../../../public/img/logo.png) center no-repeat;
  .backage{
    border:none;
    background:none;
    float:right;
    width: .1rem;
    height: .1rem;
    margin:.1rem .1rem 0 0;
    font-size: .16rem;
    font-weight: 500;
  }
}
.show {
    color: #111;
    font-family: TradeGothicforNike365-BdCn,Helvetica !important;
    font-size: 26px;
    line-height: 26px;
    margin: 0 auto;
    max-width: 25ch;
    padding: 32px 0 27px;
    text-align: center;
    font-weight: 700;
}
.init {
  height: 1rem;
  margin-bottom: .2rem;
  img {
  width: 1rem;
  height: 1rem;
  border-radius:50%;
  float: left;
  };
  .name {
    color: #111;
    float: left;
    font-family: TradeGothicforNike365-BdCn,Helvetica !important;
    font-size: .26rem;
    line-height: .26rem;
    margin-left: .2rem;
    max-width: 25ch;
    font-weight: 700;
    padding: .4rem 0 .27rem;
  };
  .logout {
    float: right;
    color: #8d8d8d;
    margin: .2rem .2rem 0 0;
  }
}
</style>
