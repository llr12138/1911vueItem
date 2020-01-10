# 1、回顾

# 2、命名视图 --- 多视图路由

**一个路由控制多个组件的变化**

## 2.1 修改App.vue 使用router-view动态加载底部选项卡

* 删除js部分，使用<router-view name="footer" />代替底部组件
```
<template>
  <div class="container">
    <router-view />
    <router-view name="footer" />
  </div>
</template>
```

## 2.2 修改路由的配置文件
**需要就是components（值为对象），不需要就是component（值为非对象），底部经常需要，不需要使用路由的懒加载**
```
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '@/components/Footer' // ++++++++++++++++++++++++
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    // component: () => import('@/views/home/index.vue')
    components: {
      default: () => import('@/views/home/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/kind',
    name: 'kind',
    components: {
      default: () => import('@/views/kind/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/cart',
    name: 'cart',
    components: {
      default: () => import('@/views/cart/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/user',
    name: 'user',
    components: {
      default: () => import('@/views/user/index.vue'),
      footer: Footer
    }
  },
  {
    path: '**',
    name: 'notfound',
    component: () => import('@/views/notfound/index.vue')
  }
]
```
# 3、构建详情页面

## 3.1 构建布局
```
// views/detail/index.vue
<template>
  <div class="detail">
    <div class="box">
      <header class="header">详情</header>
      <div class="content">详情</div>
    </div>
    <footer class="footer">详情</footer>
  </div>
</template>

```
## 3.2 编写样式
```
// App.vue
html, body, .container, .detail {
  @include rect(100%, 100%);
}
.container, .detail {}
```

## 3.3 配置详情页面的路由
**不要放在最后一个，最后一个是404页面**
```
// router/index.js
{
  path: '/detail',
  name: 'detail',
  components: {
    default: () => import('@/views/detail/index.vue')
  }
},
```

# 4、点击切换到详情页面

**声明式跳转、编程式跳转**

## 4.1 声明式跳转 --- 标签跳转 --- router-link

```
// components/Prolist.vue
<router-link to="/detail" tag="li" class="item" v-for="item of prolist" :key="item.proid">
  <div class="itemimg">
    <img :src="item.proimg" alt="">
  </div>
  <div class="iteminfo">
    <h3>{{ item.proname }}</h3>
  </div>
</router-link>
```

## 4.2 编程式跳转 --- js跳转 --- this.$router.push()
https://router.vuejs.org/zh/guide/essentials/navigation.html

* this.$router.push() // 添加一个新的页面

这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

* this.$router.replace() // 替换当前的页面

这个方法会向 history 栈替换当前的记录

* this.$router.back() // 返回上一页

* this.$router.go(num) // 前进或者后退bnum页
```
<li class="item" v-for="item of prolist" @click="toDetail" :key="item.proid">
  <div class="itemimg">
    <img :src="item.proimg" alt="">
  </div>
  <div class="iteminfo">
    <h3>{{ item.proname }}</h3>
  </div>
</li>

methods: {
  toDetail () {
    this.$router.push('/detai')
  }
}
```

# 5、声明式跳转传值给详情

* /detail/123

* /detail?proid=123

**配置路由 + 跳转传参**
## 5.1 配置路由
```
// router/index.js
{
  path: '/detail/:proid', // :proid 代表就是路由的参数
  name: 'detail',
  components: {
    default: () => import('@/views/detail/index.vue')
  }
},
```

## 5.2 跳转传参

**命名路由传参 + 字符串拼接传参**

## 5.2.1 命名路由传参 --- 传的是对象

**:to="{ name:'detail', params: { proid: item.proid}}"**

```
<router-link :to="{ name:'detail', params: { proid: item.proid}}" tag="li" class="item" v-for="item of prolist" :key="item.proid">
  <div class="itemimg">
    <img :src="item.proimg" alt="">
  </div>
  <div class="iteminfo">
    <h3>{{ item.proname }}</h3>
  </div>
</router-link>
```

## 5.2.2 字符串拼接传参 
**:to="'/detail/' + item.proid"**
```
<router-link :to="'/detail/' + item.proid" tag="li" class="item" v-for="item of prolist" :key="item.proid">
    <div class="itemimg">
      <img :src="item.proimg" alt="">
    </div>
    <div class="iteminfo">
      <h3>{{ item.proname }}</h3>
    </div>
  </router-link>
```

# 6、详情页面获取传递的参数，然后请求数据并且渲染数据
**可以通过 this.$route 获取到想要的路由参数**
```
<template>
  <div class="detail">
    <div class="box">
      <header class="header">详情</header>
      <div class="content">详情-{{ proname }}</div>
    </div>
    <footer class="footer">详情</footer>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      proname: ''
    }
  },
  mounted () {
    console.log(this.$route)
    let { proid } = this.$route.params
    axios.get('/api/pro/detail?proid=' + proid).then(res => {
      console.log(res.data.data)
      this.proname = res.data.data.proname
    })
  }
}
</script>
```

# 7、编程式跳转传参

```
// prolist.vue
<li class="item" v-for="item of prolist" @click="toDetail(item.proid)" :key="item.proid"></li>

methods: {
  toDetail (proid) {
    // this.$router.push('/detail/' + proid)
    // this.$router.push({ name: 'detail', params: { proid } })
    this.$router.push({ path: '/detail/' + proid })
  }
}
```

# 8、注册

## 8.1 编写注册页面
```
// views/register.vue
<template>
  <div class="box">
    <header class="header">注册</header>
    <div class="content">
      
    </div>
  </div>
</template>

```

## 8.2 配置注册路由
**不需要页面底部**
```
{
  path: '/register',
  name: 'register',
  components: {
    default: () => import('@/views/register/index.vue')
  }
},
```

## 8.3 个人中心添加跳转到注册页面的入口
```
<template>
  <div class="box">
    <header class="header">个人中心头部</header>
    <div class="content">
      <button>登录</button>
      <router-link to="/register" tag="button">注册</router-link>
    </div>
  </div>
</template>

```

## 8.4 编写注册的表单
```
<template>
  <div class="box">
    <header class="header">注册</header>
    <div class="content">
      <div class="registerForm">
        <input type="text" placeholder="请输入用户名" v-model="username">
        <input type="text" placeholder="请输入手机号" v-model="tel">
        <div class="code">
          <input type="text" placeholder="请输入验证码" v-model="code">
          <button>发送验证码</button>
        </div>
        <input type="password1" placeholder="请输入密码" v-model="password">
        <input type="password1" placeholder="再次输入密码" v-model="password1">

        <button class="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      tel: '',
      password: '',
      password1: '',
      code: ''
    }
  }
}
</script>

<style lang="scss">
.registerForm {
  width: 96%;
  margin: 30px 2%;
  input {
    display: block;
    outline: none;
    border: 0;
    width: 100%;
    border-bottom: 1px solid #efefef;
    height: 40px;
    text-indent: 10px;
  }
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      border: 0;
    }
    button {
      width: 120px;
      outline: none;
      border: 0;
      background: none;
    }
  }
  .register {
    display: block;
    width: 100%;
    margin: 30px 0 0 0;
    outline: none;
    border: 0;
    background: #f66;
    height: 48px;
    color: #fff;
    font-size: 22px;
    letter-spacing: 20px;
    font-weight: bold;
  }
}
</style>

```
## 8.5 添加错误提示信息
```
<template>
  <div class="box">
    <header class="header">注册</header>
    <div class="content">
      <div class="registerForm">
        <input type="text" placeholder="请输入用户名" v-model.trim="username">
        <p class="tip" v-html="usernametip"></p>
        <input type="text" placeholder="请输入手机号" v-model.trim="tel">
        <p class="tip" v-html="teltip"></p>
        <div class="code">
          <input type="text" placeholder="请输入验证码" v-model.trim="code">
          <button>发送验证码</button>
        </div>
        <p class="tip"  v-html="codetip"></p>
        <input type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tip"   v-html="passwordtip"></p>
        <input type="password" placeholder="再次输入密码" v-model.trim="password1">
        <p class="tip"   v-html="password1tip"></p>

        <button class="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      tel: '',
      password: '',
      password1: '',
      code: ''
    }
  },
  computed: {
    // 利用计算属性的依赖性生成每个表单的提示信息
    usernametip () {
      if (this.username === '') {
        return ''
      } else if (this.username.length < 6) {
        return '<span class="error">长度不能少于6位</span>'
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
      } else if (this.code !== '123456') {
        return '<span class="error">验证码错误</span>'
      } else {
        return '验证码正确'
      }
    },
    passwordtip () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 5) {
        return '<span class="error">密码长度必须大于5位</span>'
      } else {
        return '密码格式正确'
      }
    },
    password1tip () {
      if (this.password1 === '') {
        return ''
      } else if (this.password1 !== this.password) {
        return '<span class="error">两次验证码输入不一致</span>'
      } else {
        return '确认密码一致'
      }
    }
  }
}
</script>

<style lang="scss">
.registerForm {
  width: 96%;
  margin: 30px 2%;
  input {
    display: block;
    outline: none;
    border: 0;
    width: 100%;
    border-bottom: 1px solid #efefef;
    height: 40px;
    text-indent: 10px;
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
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      border: 0;
    }
    button {
      width: 120px;
      outline: none;
      border: 0;
      background: none;
    }
  }
  .register {
    display: block;
    width: 100%;
    margin: 30px 0 0 0;
    outline: none;
    border: 0;
    background: #f66;
    height: 48px;
    color: #fff;
    font-size: 22px;
    letter-spacing: 20px;
    font-weight: bold;
  }
}
</style>

```

## 8.6 注册按钮的颜色变化以及可点不可点
```
<template>
  <div class="box">
    <header class="header">注册</header>
    <div class="content">
      <div class="registerForm">
        <input type="text" placeholder="请输入用户名" v-model.trim="username">
        <p class="tip" v-html="usernametip"></p>
        <input type="text" placeholder="请输入手机号" v-model.trim="tel">
        <p class="tip" v-html="teltip"></p>
        <div class="code">
          <input type="text" placeholder="请输入验证码" v-model.trim="code">
          <button>发送验证码</button>
        </div>
        <p class="tip"  v-html="codetip"></p>
        <input type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tip"   v-html="passwordtip"></p>
        <input type="password" placeholder="再次输入密码" v-model.trim="password1">
        <p class="tip"   v-html="password1tip"></p>

        <button class="register" :disabled="!flag" @click="register" :class="{ active: flag }">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'wudaxun',
      tel: '18813007814',
      password: '123456',
      password1: '123456',
      code: '123456'
    }
  },
  methods: {
    register () {
      console.log('点击了注册按钮')
    }
  },
  computed: {
    // 利用计算属性的依赖性生成每个表单的提示信息
    usernametip () {
      if (this.username === '') {
        return ''
      } else if (this.username.length < 6) {
        return '<span class="error">长度不能少于6位</span>'
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
      } else if (this.code !== '123456') {
        return '<span class="error">验证码错误</span>'
      } else {
        return '验证码正确'
      }
    },
    passwordtip () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 5) {
        return '<span class="error">密码长度必须大于5位</span>'
      } else {
        return '密码格式正确'
      }
    },
    password1tip () {
      if (this.password1 === '') {
        return ''
      } else if (this.password1 !== this.password) {
        return '<span class="error">两次验证码输入不一致</span>'
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
  }
}
</script>

<style lang="scss">
.registerForm {
  width: 96%;
  margin: 30px 2%;
  input {
    display: block;
    outline: none;
    border: 0;
    width: 100%;
    border-bottom: 1px solid #efefef;
    height: 40px;
    text-indent: 10px;
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
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      border: 0;
    }
    button {
      width: 120px;
      outline: none;
      border: 0;
      background: none;
    }
  }
  .register {
    display: block;
    width: 100%;
    margin: 30px 0 0 0;
    outline: none;
    border: 0;
    background: #efefef;
    height: 48px;
    color: #fff;
    font-size: 22px;
    // letter-spacing: 20px;
    font-weight: bold;
    &.active {
      background: #f66;
    }
  }
}
</style>

```

## 8.7 发送短信验证码逻辑
```
<template>
  <div class="box">
    <header class="header">注册</header>
    <div class="content">
      <div class="registerForm">
        <input type="text" placeholder="请输入用户名" v-model.trim="username">
        <p class="tip" v-html="usernametip"></p>
        <input type="text" placeholder="请输入手机号" v-model.trim="tel">
        <p class="tip" v-html="teltip"></p>
        <div class="code">
          <input type="text" placeholder="请输入验证码" v-model.trim="code">
          <button :disabled="codeflag" @click="sendCode">{{ msg }}</button>
        </div>
        <p class="tip"  v-html="codetip"></p>
        <input type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tip"   v-html="passwordtip"></p>
        <input type="password" placeholder="再次输入密码" v-model.trim="password1">
        <p class="tip"   v-html="password1tip"></p>

        <button class="register" :disabled="!flag" @click="register" :class="{ active: flag }">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'wudaxun',
      tel: '18813007814',
      password: '123456',
      password1: '123456',
      code: '123456',
      time: 4,
      msg: '发送验证码',
      codeflag: false
    }
  },
  methods: {
    register () {
      console.log('点击了注册按钮')
    },
    sendCode () {
      console.log('发验证码')
      this.codeflag = true
      this.msg = this.time + '后重新发送'
      var timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          this.time = 4
          this.msg = '发送验证码'
          this.codeflag = false
          clearInterval(timer)
        } else {
          this.msg = this.time + '后重新发送'
        }
      }, 1000)
    }
  },
  computed: {
    // 利用计算属性的依赖性生成每个表单的提示信息
    usernametip () {
      if (this.username === '') {
        return ''
      } else if (this.username.length < 6) {
        return '<span class="error">长度不能少于6位</span>'
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
      } else if (this.code !== '123456') {
        return '<span class="error">验证码错误</span>'
      } else {
        return '验证码正确'
      }
    },
    passwordtip () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 5) {
        return '<span class="error">密码长度必须大于5位</span>'
      } else {
        return '密码格式正确'
      }
    },
    password1tip () {
      if (this.password1 === '') {
        return ''
      } else if (this.password1 !== this.password) {
        return '<span class="error">两次验证码输入不一致</span>'
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
.registerForm {
  width: 96%;
  margin: 30px 2%;
  input {
    display: block;
    outline: none;
    border: 0;
    width: 100%;
    border-bottom: 1px solid #efefef;
    height: 40px;
    text-indent: 10px;
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
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      border: 0;
    }
    button {
      width: 120px;
      outline: none;
      border: 0;
      background: none;
    }
  }
  .register {
    display: block;
    width: 100%;
    margin: 30px 0 0 0;
    outline: none;
    border: 0;
    background: #efefef;
    height: 48px;
    color: #fff;
    font-size: 22px;
    // letter-spacing: 20px;
    font-weight: bold;
    &.active {
      background: #f66;
    }
  }
}
</style>

```
## 8.8 调用发送短信验证码接口

