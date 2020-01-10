<template>
  <div class="box">
    <div class="commentInput-header">
      <i @click="toBack" class="iconfont icon-fanhui"></i>
      <u @click.stop="updateStatus">发布</u>
    </div>
    <div class="count commentInput">
      <h4>留下您的评价吧~</h4>
      <textarea class="textInput" cols="30" rows="6" placeholder="您对此款宝贝满意吗？说说您的使用心得吧~"></textarea>
      <u :class="CactiveClass == index ? 'actived':''" v-for="(item,index) in commitKind" :key="index" @click.stop="getCommita(index)">
        {{item}}
      </u>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Field, Toast } from 'vant'
import axios from 'axios'

Vue.use(Toast)
Vue.use(Field)
export default {
  data () {
    return {
      commitKind: ['好评', '中评', '差评'],
      CactiveClass: 0,
      proid: '',
      username: '',
      proname: '',
      sel: ''
    }
  },
  created () {
    let { orderid } = this.$route.params
    // let orderid = 'order_fd446360-225a-11ea-bc96-0d5a817f7edb'
    axios.get('/api/order/detail', {
      params: {
        token: localStorage.getItem('token'),
        orderid
      }
    }).then(res => {
      this.proid = res.data.data.list[0].proid
      this.proname = res.data.data.list[0].proname
      this.sel = res.data.data.list[0].sel
      this.username = res.data.data.username
    })
  },
  methods: {
    toBack () {
      this.$router.back()
    },
    getCommita (index) {
      this.CactiveClass = index
    },
    updateStatus () {
      let textInput = document.querySelector('.textInput')
      // console.log(textInput.value)
      axios.post('/api/order/updateNote', {
        token: localStorage.getItem('token'),
        orderid: this.$route.params.orderid,
        // orderid: 'order_fd446360-225a-11ea-bc96-0d5a817f7edb',
        status: 4
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        } else if (res.data.code === '33333') {
          Toast('提交评论失败')
        } else if (res.data.code === '20019') {
          textInput.value = ''
          // this.$router.push('/cart')                     ----------------------------------------
        }
      })
      axios.get('/api/pro/updateComment', {
        params: {
          token: localStorage.getItem('token'),
          // proid: 'pro_a34f3730-22c9-11ea-82b1-6d62dd62837c',    -------------------------------------
          proid: this.proid,
          detail: textInput.value,
          username: this.username,
          proname: this.proname,
          sel: this.sel,
          type: this.CactiveClass
        }
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        } else if (res.data.code === '20013') {
          Toast('提交成功')
          textInput.value = ''
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.commentInput-header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
  overflow: hidden;
  padding: 10px;
  font-size: 16px;
  background: rgba(122, 122, 122, 0.3);
  i{
    float: left;
    padding:2px 6px;
    font-weight: 700;
  }
  u{
    float: right;
    padding:2px 6px;
  }
}
.commentInput{
  margin-top: 46px;
  height: 100%;
  h4{
    font-size: 16px;
    margin: 20px 10px;
  }
  .textInput{
    display: block;
    min-height: 15%;
    width: 100%;
    padding: 20px;
    text-align: top;
    border-top: 1px solid rgba(122, 122, 122, 0.3);
    border-bottom: 1px solid rgba(122, 122, 122, 0.3);
    border-left: none;
    border-right: none;
  }
  u{
    display: inline-block;
    font-size: 12px;
    padding: 4px 14px;
    border: 1px solid rgb(173, 173, 173);
    border-radius: 10px;
    margin: 20px 10px;
    letter-spacing: 2px;
    text-align: center;
    &.actived{
      background-color: rgb(0, 0, 0);
      color: white;
    }
  }
  i{
    display: block;
  }
}
</style>
