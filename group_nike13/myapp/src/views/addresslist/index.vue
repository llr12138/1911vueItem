<template>
  <div class="box">
    <header class="header">地址列表</header>
    <div class="content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        default-tag-text="默认"
        @select="clickItem"
      >
        <div slot="default">
          <button @click="back">确认地址</button>
        </div>
      </van-address-list>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { Toast, AddressList } from 'vant'
Vue.use(Toast)
Vue.use(AddressList)
export default {
  data () {
    return {
      list: [],
      chosenAddressId: '1',
      flag: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    clickItem (item, index) {
      console.log(item)
      // this.$router.back
      // 点谁谁是默认地址
      axios.post('/api/address/update', {
        token: localStorage.getItem('token'),
        username: item.name,
        tel: item.tel,
        address: item.address,
        addressid: item.addressid,
        userid: localStorage.getItem('userid'),
        flag: 1
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        }
      })
    },
    onAdd () {
      console.log('新增地址')
      this.$router.push('/addressadd')
    },
    onEdit (item, index) {
      console.log('修改地址', item)
      console.log('修改地址', index)
      this.$router.push('/addressedit/' + item.addressid)
    }
  },
  mounted () {
    axios.get('/api/address', {
      params: {
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid')
      }
    }).then(res => {
      if (res.data.code === '10119') {
        Toast('请先登录')
        this.$router.push('/login')
      } else {
        if (res.data.code === '10017') {
          Toast('前先添加地址')
        } else {
          res.data.data.map((item, index) => {
            item.id = index + 1
            item.name = item.username
            if (item.flag === 1) {
              this.chosenAddressId = index + 1
            }
          })
          console.log(res.data.data)
          this.list = res.data.data
        }
      }
    })
  }
}
</script>
