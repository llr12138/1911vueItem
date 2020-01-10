<template>
  <div class="box">
    <div class="header-sets"><button class="backage" @click="backage">&times;</button></div>
    <div class="show">修改信息</div>
    <div class="setss">
      <div class="setsForm">
        <input type="text" placeholder="请输入新用户名" v-model.trim="username">
        <p class="tip" v-html="usernametip"></p>
        <div>
          <input type="text" class="phone" placeholder="请输入手机号" v-model.trim="tel">
          <p class="tip" v-html="teltip"></p>
          </div>
        <input type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tip"   v-html="passwordtip"></p>
        <input type="password" placeholder="再次输入密码" v-model.trim="password1">
        <p class="tip"   v-html="password1tip"></p>
        <span>请选择性别</span>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
        <span class="day">请选择新幸运日</span>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value3" :options="option3" />
          <van-dropdown-item v-model="value4" :options="option4" />
        </van-dropdown-menu>

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
      password1: '',
      radio: '1',
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      option1: [
        { text: '男', value: 0 },
        { text: '女', value: 1 },
        { text: '未知', value: 2 }
      ],
      option2: [
        { text: '2017', value: 0 },
        { text: '2016', value: 1 },
        { text: '2015', value: 2 },
        { text: '2014', value: 3 },
        { text: '2013', value: 4 },
        { text: '2012', value: 5 },
        { text: '2011', value: 6 },
        { text: '2010', value: 7 },
        { text: '2009', value: 8 },
        { text: '2008', value: 9 },
        { text: '2007', value: 10 },
        { text: '2006', value: 11 },
        { text: '2005', value: 12 },
        { text: '2004', value: 13 },
        { text: '2003', value: 14 },
        { text: '2002', value: 15 },
        { text: '2001', value: 16 },
        { text: '2000', value: 17 },
        { text: '1999', value: 18 }
      ],
      option3: [
        { text: '1', value: 0 },
        { text: '2', value: 1 },
        { text: '3', value: 2 },
        { text: '4', value: 3 },
        { text: '5', value: 4 },
        { text: '6', value: 5 },
        { text: '7', value: 6 },
        { text: '8', value: 7 },
        { text: '9', value: 8 },
        { text: '10', value: 9 },
        { text: '11', value: 10 },
        { text: '12', value: 11 }
      ],
      option4: [
        { text: '1', value: 0 },
        { text: '2', value: 1 },
        { text: '3', value: 2 },
        { text: '4', value: 3 },
        { text: '5', value: 4 },
        { text: '6', value: 5 },
        { text: '7', value: 6 },
        { text: '8', value: 7 },
        { text: '9', value: 8 },
        { text: '10', value: 9 },
        { text: '11', value: 10 },
        { text: '12', value: 11 },
        { text: '13', value: 12 },
        { text: '14', value: 13 },
        { text: '15', value: 14 },
        { text: '16', value: 15 },
        { text: '17', value: 16 },
        { text: '18', value: 17 },
        { text: '19', value: 18 },
        { text: '20', value: 19 },
        { text: '21', value: 20 },
        { text: '22', value: 21 },
        { text: '23', value: 22 },
        { text: '24', value: 23 },
        { text: '25', value: 24 },
        { text: '26', value: 25 },
        { text: '27', value: 26 },
        { text: '28', value: 27 },
        { text: '29', value: 28 },
        { text: '30', value: 29 }
      ]
    }
  },
  methods: {
    backage () {
      this.$router.push('/home')
    },
    register () {
      axios.post('/api/users/update2', {
        userid: localStorage.getItem('userid'),
        username: this.username,
        password: this.password,
        tel: this.tel
      }).then(res => {
        console.log(res.data)
        if (res.data.code === '10009') {
          // this.errortip = '修改成功'
          Notify({
            message: '修改成功',
            color: '#333',
            background: '#e5e5e5'
          })
          this.$router.push('/user')
        } else {
          Notify({
            message: '修改失败',
            color: '#333',
            background: '#e5e5e5'
          })
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
      if (this.usernametip === '用户名格式正确') {
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
      font-size: 12px;
      text-align: left;
      height: 20px;
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
