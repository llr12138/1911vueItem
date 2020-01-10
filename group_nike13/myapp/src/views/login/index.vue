<template>
  <div class="box">
    <div class="header-login"><button class="backage" @click="backage">&times;</button></div>
    <div class="show">登录NIKE账号</div>
    <div class="content">
      <div class="loginForm">
        <div><i>+86</i><input type="text" class="phone" placeholder="请输入手机号" v-model.trim="tel"><br/>
        <p class="tip" v-html="teltip"></p></div>
        <input type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tip"   v-html="passwordtip"></p>
        <span class="emil">使用电子邮件登录</span>
        <div class="choose"><input class="cb" type="checkbox" checked="checked"><span>保持登录</span><p @click="forget">忘记密码？</p></div>
        <span class="low">一旦登录，即表明你同意 Nike 的<a>隐私政策</a> 和 <a>使用条款</a></span>
        <button class="login" :disabled="!flag" @click="login" :class="{ active: flag }">登录</button>
        <span class="reg">还不是会员？<router-link to="/register" tag="a">立即加入</router-link></span>
        <div class="errortip">{{ errortip }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Notify } from 'vant'

Vue.use(Notify)
export default {
  data () {
    return {
      tel: '',
      password: '',
      errortip: ''
    }
  },
  methods: {
    backage () {
      this.$router.push('/home')
    },
    forget () {
      this.$router.push('/register2')
    },
    login () {
      console.log('点击了登录按钮')
      axios.post('/api/users/login', {
        tel: this.tel,
        password: this.password
      }).then(res => {
        console.log(res)
        if (res.data.code === '10006') {
          this.errortip = '用户还未注册，请先注册'
        } else if (res.data.code === '10007') {
          Notify({
            message: '密码错误',
            color: '#333',
            background: '#e5e5e5'
          })
          this.password = ''
        } else {
          // 登陆成功，存储信息，返回上一页
          localStorage.setItem('userid', res.data.data.userid)
          localStorage.setItem('username', res.data.data.username)
          localStorage.setItem('token', res.data.data.token)
          this.$store.commit('changeLoginState', true)
          localStorage.setItem('loginstate', true)
          Notify({
            message: '登录成功',
            color: '#333',
            background: '#e5e5e5'
          })
          this.$router.push('/user')
        }
      })
    }
  },
  computed: {
    teltip () {
      if (this.tel === '') {
        return ''
      } else if (this.tel.length !== 11) {
        return '<span class="error">请输入正确的手机号码</span>'
      } else {
        return '手机格式正确'
      }
    },
    passwordtip () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 6) {
        return '<span class="error">密码长度必须大于6位</span>'
      } else {
        return '密码格式正确'
      }
    },
    flag () {
      if (this.teltip === '手机格式正确' && this.passwordtip === '密码格式正确') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.content{
  width: 100%;
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
.emil{
  font-family: Helvetica !important;
  font-size: .14rem;
  color: #8d8d8d;
  line-height: normal;
  cursor: pointer;
}
.low{
  display: block;
  width: 100%;
  height: .6rem;
  font-size: .12rem;
  line-height: .3rem;
  color: #8d8d8d;
  text-align: center;
  a{
    color:#8d8d8d;
    text-decoration:underline
  }
}
.choose{
  width: 100%;
  margin-top: .1rem;
  height: .2rem;
  .cb{
    height: 80%;
    border: 1px solid #bcbcbc;
    border-radius: 3px;
    width: .1rem;
    float: left;
  };
  span{
    color:#8d8d8d;
    font-size: .12rem;
    line-height: .2rem;
    float: left;
    margin-left: .1rem;
  };
  p{
    float: right;
    font-size: .12rem;
    line-height: .2rem;
    color: #bcbcbc;
    text-decoration:underline;
  }
}
.reg{
  color: #8d8d8d;
  line-height: 30px;
  width: 100%;
  font-size:12px;
  text-align: center;
  margin:20px 25%;
  a{
    color:#111;
    text-decoration:underline
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
.loginForm {
  width: 80%;
  margin: .1rem 10%;
  i{
    width: 20%;
    float: left;
    height: .4rem;
    text-align: center;
    font-size: .18rem;
    line-height: .4rem;
    background: #8d8d8d;
    color:#fff;
    margin-bottom: .05rem;
    border-radius: .02rem 0 0 .02rem;
  }
  .phone{
    width: 80%;
    float: left;
    margin-bottom: .05rem;
    margin-top:0;
    border-radius: 0 .02rem .02rem 0;
    }
  input {
    display: block;
    outline: none;
    border: 0;
    width: 100%;
    border: 1px solid #e5e5e5;
    height: .4rem;
    text-indent: .1rem;
    border-radius: .02rem;
  }
  .tip {
    height: .1rem;
    color: #8d8d8d;
    font-size: .12rem;
    text-align: left;
    margin-bottom: .35rem;
    .error {
      color: #fe0000;
    }
  }
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      border: 0;
    }
    button {
      width: 1.2rem;
      outline: none;
      border: 0;
      background: none;
    }
  }
  .login {
    display: block;
    width: 100%;
    margin: .1rem 0 0 0;
    outline: none;
    border: 0;
    background: #efefef;
    height: .48rem;
    color: #fff;
    font-size: .22rem;
    // letter-spacing: 20px;
    font-weight: bold;
    &.active {
      background: #000;
      border: .01rem solid #000;
      border-radius: .03rem;
      color: #fff;
      cursor: pointer;
      display: block;
      font-family: TradeGothicforNike365-BdCn,Helvetica !important;
      font-size: .15rem;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
