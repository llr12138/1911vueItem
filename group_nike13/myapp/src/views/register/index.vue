<template>
  <div class="box">
    <div class="header-register"><button class="backage" @click="backage">&times;</button></div>
    <div class="show">创建您的NIKE账户</div>
    <p class="ties">我们需要验证您的号码以继续操作。我们将通过短信向您发送一条一次性的验证码.</p>
    <div class="content_re">
      <div class="registerForm">
        <input type="text" placeholder="请输入用户名" v-model.trim="username">
        <p class="tip" v-html="usernametip"></p>
        <div>
          <i>+86</i>
          <input type="text" class="phone" placeholder="请输入手机号" v-model.trim="tel"><br/>
          <button :disabled="codeflag" @click="sendCode">{{ msg }}</button><br/>
          <p class="tip" v-html="teltip"></p>
          </div>

        <div class="code">
          <input type="text" placeholder="请输入验证码" v-model.trim="code">
        </div>
        <p class="tip"  v-html="codetip"></p>
        <input type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tip"   v-html="passwordtip"></p>
        <input type="password" placeholder="再次输入密码" v-model.trim="password1">
        <p class="tip"   v-html="password1tip"></p>

        <button class="register1" :disabled="!flag" @click="register" :class="{ active: flag }">注册</button><br/>
        <span class="reg">已经是会员？<router-link to="/login" tag="a">立即登录</router-link></span>
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
      username: '',
      tel: '',
      password: '',
      password1: '',
      code: '',
      adminCode: '',
      time: 10,
      msg: '发送验证码',
      codeflag: false,
      errortip: ''
    }
  },
  methods: {
    backage () {
      this.$router.push('/home')
    },
    register () {
      // console.log('点击了注册按钮')
      axios.post('/api/users/register', {
        username: this.username,
        tel: this.tel,
        password: this.password
      }).then(res => {
        if (res.data.code === '10001') {
          // this.errortip = '该用户已注册，请直接登录'
        } else if (res.data.code === '10003') {
          // this.errortip = '注册失败，请重新注册'
        } else {
          Notify({
            message: '注册成功',
            color: '#333',
            background: '#e5e5e5'
          })
          this.$router.push('/login') // 注册成功，返回上一页
        }
      })
    },
    sendCode () {
      this.codeflag = true
      this.msg = this.time + '后重新发送'
      var timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          this.time = 10
          this.msg = '发送验证码'
          this.codeflag = false
          clearInterval(timer)
        } else {
          this.msg = this.time + '后重新发送'
        }
      }, 1000)
      this.sendTelCode()
    },
    sendTelCode () {
      axios.get('/api/users/sendCode?tel=' + this.tel).then(res => {
        console.log(res.data)
        if (res.data.code === '10001') {
          this.errortip = '该用户已注册，请直接登录'
        } else if (res.data.code === '10005') {
          this.errortip = '发送验证码失败，请重新发送'
        } else {
          this.adminCode = res.data.code
        }
      })
    }
  },
  computed: {
    // 利用计算属性的依赖性生成每个表单的提示信息
    usernametip () {
      if (this.username === '') {
        return ''
      } else if (this.username.length < 2) {
        return '<span class="error">长度不能少于2位</span>'
      } else {
        return '用户名格式正确'
      }
    },
    teltip () {
      if (this.tel === '') {
        return ''
      } else if (this.tel.length !== 11) {
        return '<span class="error">请输入正确的手机号码</span>'
      } else {
        return '手机格式正确'
      }
    },
    codetip () {
      if (this.code === '') {
        return ''
      } else if (this.code * 1 !== this.adminCode && this.code !== '') {
        return '<span class="error">验证码错误</span>'
      } else {
        return '验证码正确'
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
    password1tip () {
      if (this.password1 === '') {
        return ''
      } else if (this.password1 !== this.password) {
        return '<span class="error">两次密码码输入不一致</span>'
      } else {
        return '确认密码一致'
      }
    },
    flag () {
      if (this.usernametip === '用户名格式正确' && this.teltip === '手机格式正确' && this.codetip === '验证码正确' && this.passwordtip === '密码格式正确' && this.password1tip === '确认密码一致') {
        return true
      } else {
        return false
      }
    }
    // codeflag () {
    //   if (this.teltip === '手机格式正确') {
    //     return false
    //   } else {
    //     return true
    //   }
    // }
  },
  watch: {
    teltip (newVal) {
      console.log(1111)
      if (newVal === '手机格式正确') {
        this.codeflag = false
      } else {
        this.codeflag = true
      }
    }
  }
}
</script>

<style lang="scss">
.header-register{
  width: 100%;
  height: 100px;
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
    font-size: .26rem;
    line-height: .26rem;
    margin: 0 auto;
    max-width: 25ch;
    padding: .32rem 0 .27rem;
    text-align: center;
    font-weight: 700;
}
.ties {
  color: #666;
  width: 80%;
  margin: .1rem 10%;
  text-align: center;
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
.content_re {
  width: 100%;
  margin:0 auto;
}
.registerForm {
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
    color:#333;
    margin-bottom: .05rem;
    border-radius: .02rem 0 0 .02rem;
  }
  button {
      width: 20%;
      height: .4rem;
      outline: none;
      border-radius: 0 .02rem .02rem 0;
      border: none;
      background: #8d8d8d;
      color:#333;
      float: left;
      margin-top: -.2rem;
      margin-bottom: .05rem;
    }
  .phone{
    width: 60%;
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
    margin-bottom: .1rem;
    .error {
      color: #fe0000;
    }
  }
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      border: 1px solid #e5e5e5;
    }
  }
  .register1 {
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
