<template>
  <div class="box">
    <div class="header-sets"><button class="backage" @click="backage">&times;</button></div>
    <div class="show">修改信息</div>
    <div class="setss">
      <div class="setsForm">
        <input type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tip"   v-html="passwordtip"></p>
        <input type="password" placeholder="再次输入密码" v-model.trim="password1">
        <p class="tip"   v-html="password1tip"></p>

        <button class="sets" :disabled="!flag" @click="register" :class="{ active: flag }">修改</button>
        <div class="errortip">{{ errortip }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { RadioGroup, Radio, DropdownMenu, DropdownItem, Notify } from 'vant'

Vue.use(DropdownMenu).use(DropdownItem).use(Notify)
Vue.use(RadioGroup).use(Radio)
export default {
  data () {
    return {
      username: '',
      errortip: '',
      tel: '',
      password: '',
      password1: ''
    }
  },
  methods: {
    backage () {
      this.$router.push('/home')
    },
    register () {
      axios.post('/api/users/update', {
        userid: localStorage.getItem('userid'),
        // username: this.username,
        password: this.password
        // tel: this.tel
      }).then(res => {
        console.log(res.data)
        if (res.data.code === '10009') {
          Notify({
            message: '修改成功',
            color: '#333',
            background: '#e5e5e5'
          })
          this.$router.push('/user')
        } else {
          // this.errortip = '修改失败'
        }
      })
    }
  },
  computed: {
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
      if (this.password1tip === '确认密码一致') {
        return true
      } else {
        return false
      }
    }
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
.header-sets {
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
.tip {
    height: 20px;
    color: lightgreen;
    font-size: 12px;
    text-align: left;
    .error {
      color: #f66;
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
.setss {
  margin: 0 10%;
}
.setsForm {
  width: 96%;
  margin: 30px 2%;
  input {
    display: block;
    outline: none;
    width: 100%;
    border: 1px solid #e5e5e5;
    height: .4rem;
    text-indent: .1rem;
    border-radius: .02rem;
  }
  .check {
    margin-bottom: .2rem;
  }
  .sex {
    float: left;
  }
  span {
    margin: .1rem 0;
    font-size: .14rem;
    color: #111;
  }
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    button {
      width: 120px;
      outline: none;
      border: 0;
      background: none;
    }
  }
}
  .sets {
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
  .day {
    margin-bottom: .15rem;
  }
</style>
