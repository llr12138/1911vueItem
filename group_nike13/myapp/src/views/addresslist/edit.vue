<template>
  <div class="box">
    <header class="header">修改地址</header>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-set-default
        :address-info = "addressinfo"
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['选择省', '选择市', '选择区/县']"
        @save="onSave"
        @change-area="onChangeArea"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { AddressEdit, Toast } from 'vant'
import areaList from './areaList'
import axios from 'axios'
Vue.use(AddressEdit)
Vue.use(Toast)
export default {
  data () {
    return {
      areaList,
      searchResult: [],
      selectArea: [],
      addressinfo: {}
    }
  },
  mounted () {
    axios.get('/api/address/detail', {
      params: {
        token: localStorage.getItem('token'),
        addressid: this.$route.params.addressid
      }
    }).then(res => {
      if (res.data.code === '10119') {
        Toast('请先登录')
        this.$router.push('/login')
      } else {
        console.log(res.data.data.flag === 1)
        console.log(res.data.data.address)
        let addressArr = res.data.data.address.split(' ')
        let isDefault = false
        if (res.data.data.flag === 1) {
          isDefault = true
        }
        this.addressinfo = {
          id: res.data.data.addressid,
          name: res.data.data.username,
          tel: res.data.data.tel,
          isDefault,
          province: addressArr[0],
          city: addressArr[1],
          county: addressArr[2],
          addressDetail: addressArr[addressArr.length - 1]
        }
      }
    })
  },
  methods: {
    onSave (content) {
      console.log(content)
      Toast('save')
      axios.post('/api/address/update', {
        token: localStorage.getItem('token'),
        username: content.name,
        tel: content.tel,
        address: content.addressDetail,
        addressid: this.$route.params.addressid,
        userid: localStorage.getItem('userid'),
        flag: content.isDefault ? 1 : 0
      }).then(res => {
        if (res.data.code === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        } else {
          this.$router.back()
        }
      })
    },
    onChangeArea (val) {
      console.log(val)
      this.selectArea = val
    },
    onChangeDetail (val) {
      console.log(val)
      if (val) {
        let str = ''
        this.selectArea.map(item => {
          str += item.name + ' '
        })
        this.searchResult = [{
          name: val,
          address: str
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>
