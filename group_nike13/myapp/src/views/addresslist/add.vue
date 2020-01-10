<template>
  <div class="box">
    <header class="header">添加地址</header>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['选择省', '选择市', '选择区/县']"
        @save="onSave"
        @delete="onDelete"
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
      selectArea: []
    }
  },
  methods: {
    onSave (content) {
      Toast('save')
      console.log('save', content)
      axios.post('/api/address/add', {
        token: localStorage.getItem('token'),
        username: content.name,
        tel: content.tel,
        address: content.addressDetail,
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
    onDelete () {
      Toast('delete')
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
