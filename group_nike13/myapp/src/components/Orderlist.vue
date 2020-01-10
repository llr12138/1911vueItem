<template>
<div class="box2">
<div class="orderInfo">
  <div class="top">
  <div class="mail almost">
    <p>电子邮件</p>
    <div @click="showPopup1"  class="tip">
      <span>{{ mail }}</span>
      &nbsp;&nbsp;&nbsp;<i>+</i>
    </div>
  </div>
  <div class="address almost">
    <p>配送</p>
    <div class="tip">
      <span v-if="!flag" @click="showPopup22">添加地址</span>
      <span v-else @click="showPopup2">{{ username }}&nbsp;{{ tel }}&nbsp;{{ address }}</span>
      &nbsp;&nbsp;&nbsp;<i @click="showPopup2">+</i>
    </div>
  </div>
  <div class="paytype almost">
    <p>付款方式</p>
    <div  @click="showPopup3"  class="tip">
      <span>{{ paytypeText }}</span>&nbsp;&nbsp;&nbsp;<i @click="showPopup3">+</i>
    </div>
  </div>
  <div class="list almost">
    <p>购买清单</p>
    <div>
      <div  @click="showPopup4"  class="tip">
        <!-- <span>￥&nbsp;</span>&nbsp;&nbsp;&nbsp;<i @click="showPopup4">+</i> -->
        <span>￥{{ totalPrice }}&nbsp;</span>&nbsp;&nbsp;&nbsp;<i @click="showPopup4">+</i>
      </div>
      <h3>发票抬头</h3>
    </div>
  </div>
  <p class="rule">点击付款，即表示同意<a href="#">销售条款</a>和<a href="#">隐私政策</a></p>
  <ul class="prolistOrd g-clear">
    <p>详情</p>
  <li class="itemOrd" v-for='(item) of orderall.list' :key="item.proid">
    <div class="itemimgOrd">
      <img :src="item.proimg" alt="#">
    </div>
    <div class="iteminfoOrd">
      <h3>{{ item.proname }}</h3>
      <p>{{ item.price }}</p>
      {{ item.num }}
    </div>
  </li>
  </ul>
  </div>
  <div class="bottom">
      <button @click="onSubmitOrder" class="subBtn">通过{{ paytypeText }}支付</button>
  </div>

</div>
    <van-popup
  v-model="show1"
  closeable
  close-icon="arrow-down"
  position="bottom"
  :style="{ height: '50%' }"
  round
>
  <div class="pop pop1">
    <h2>电子邮件</h2>
    <input type="text" class="text" v-model="mail">
    <p>我们会将您的订单汇总和跟新发送到此邮件地址</p>
    <!-- <ul>
      <li>
        <input type="radio" name="mail"><span>queena5@qq.com</span>
      </li>
      <li>
        <input type="radio" name="mail"><span>queena5@qq.com</span>
      </li>
      <li>
        <input type="radio" name="mail"><span>queena5@qq.com</span>
      </li>
    </ul> -->
    <button @click="close1">继续</button>
  </div>
</van-popup>
  <van-popup
  v-model="show2"
  closeable
  close-icon="arrow-down"
  position="bottom"
  :style="{ height: '80%' }"
  round
>
  <!-- <div class="pop pop1">
    <h2>配送地址</h2>
    <input type="text" class="text">
    <p>我们会将您的订单汇总和跟新发送到此邮件地址</p>
    <ul>
      <li>
        老李 18888888888 上海市 上海市 松江区 万象城
      </li>
    </ul>
    <button class="addaddress">新增</button>
    <button>继续</button>
  </div> -->
  <div class="pop pop2">
  <van-address-list
  v-model="chosenAddressId"
  :list="list" @add="onAddaddress"
  @edit="onEdit" default-tag-text="默认" @select="selectItem">
    <div class="ensure">
      <button @click="close2">确认地址</button>
    </div>
  </van-address-list>
  </div>
</van-popup>
  <van-popup
  v-model="show21"
  closeable
  close-icon="arrow-down"
  position="bottom"
  :style="{ height: '80%' }"
  round
>
  <div class="pop pop21">
    <van-address-edit
    :area-list="areaList"
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['选择省', '选择市', '选择区/县']"
    :address-info = "addressinfo"
    @save="onSaveaddressedit"
    @change-area="onChangeArea"
    @change-detail="onChangeDetail"
  />
  </div>
</van-popup>
  <van-popup
  v-model="show22"
  closeable
  close-icon="arrow-down"
  position="bottom"
  :style="{ height: '80%' }"
  round
>
  <div class="pop pop22">
    <van-address-edit
    :area-list="areaList"
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['选择省', '选择市', '选择区/县']"
    :address-info = "addressinfo"
    @save="onSavenewaddress"
    @change-area="onChangeArea"
    @change-detail="onChangeDetail"
  />
  </div>
</van-popup>
  <van-popup
  v-model="show3"
  closeable
  close-icon="arrow-down"
  position="bottom"
  :style="{ height: '60%' }"
  round
>
  <div class="pop pop3">
    <h2>选择支付方式</h2>
    <div><input type="radio" v-model="paytype" value= 0><span>支付宝</span></div>
    <div><input type="radio" v-model="paytype" value= 1><span>微信</span></div>
    <button @click="close3">确认</button>
  </div>
</van-popup>
  <van-popup
  v-model="show4"
  closeable
  close-icon="arrow-down"
  position="bottom"
  :style="{ height: '10%' }"
  round
>
  <div>
    哈哈
  </div>
</van-popup>
</div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { SubmitBar, Toast, Popup, AddressList, AddressEdit } from 'vant'
import areaList from './areaList'
Vue.use(SubmitBar)
Vue.use(Toast)
Vue.use(Popup)
Vue.use(AddressList)
Vue.use(AddressEdit)
export default {
  props: {
    orderall: {
      type: Object
    }
  },
  data () {
    return {
      flag: false,
      username: '',
      tel: '',
      address: '',
      note: '',
      show1: false,
      show2: false,
      show21: false,
      show22: false,
      show3: false,
      show4: false,
      list: [],
      chosenAddressId: '1',
      areaList,
      searchResult: [],
      selectArea: [],
      addressinfo: {},
      nowaddressid: '',
      paytype: 0,
      mail: 'queena5@163.com'
    }
  },
  computed: {
    totalPrice () {
      console.log(11111111)
      console.log(this.orderall.list)
      console.log(22222222)
      let totalPrice = 0
      if (this.orderall.list) {
        this.orderall.list.map(item => {
          totalPrice += item.num * item.price
        })
      }
      return totalPrice
    },
    paytypeText () {
      if (this.paytype === 0) {
        return '支付宝'
      } else {
        return '微信'
      }
    }
  },
  methods: {
    showPopup1 () {
      this.show1 = true
    },
    showPopup2 () {
      this.show2 = true
    },
    showPopup21 () {
      this.show21 = true
    },
    showPopup22 () {
      this.show22 = true
    },
    showPopup3 () {
      this.show3 = true
    },
    showPopup4 () {
      this.show4 = false
    },
    close1 () {
      this.show1 = false
    },
    close2 () {
      this.show2 = false
    },
    close3 () {
      this.show3 = false
    },
    onSubmitOrder () {
      console.log(88888888)
      if (this.flag) {
        console.log('提交订单')
        let cartidarr = []
        this.orderall.list.map(item => {
          cartidarr.push(item.cartid)
        })
        axios.post('/api/order/updateOrder', {
          token: localStorage.getItem('token'),
          orderid: this.orderall.orderid,
          cartidarr,
          username: this.username,
          tel: this.tel,
          address: this.address,
          note: this.note
        }).then(res => {
          if (res.data.code === '10119') {
            Toast('请先登录')
            this.$router.push('/login')
          } else {
            Toast('确认订单')
            console.log(9999999999)
            if (this.paytype === 0) {
              this.$router.replace('/alipay/' + this.orderall.orderid)
            } else {
              this.$router.replace('/wechart/' + this.orderall.orderid)
            }
          }
        })
      } else {
        Toast('请先添加地址')
      }
    },
    getAddressList () {
      this.$router.push('/addresslist')
    },
    onAddaddress () {
      console.log('新增地址')
      this.show22 = true
      // this.$router.push('/addressadd')
      this.addressinfo = {}
    },
    onEdit (item, index) {
      // console.log('修改地址', item)
      // console.log('修改地址', index)
      // this.$router.push('/addressedit/' + item.addressid)
      this.nowaddressid = item.addressid
      this.show21 = true
      let addressArr = item.address.split('  ')
      let isDefault = false
      if (item.flag === 1) {
        isDefault = true
      }
      this.addressinfo = {
        id: item.addressid,
        name: item.username,
        tel: item.tel,
        isDefault,
        province: addressArr[0],
        city: addressArr[1],
        county: addressArr[2],
        addressDetail: addressArr[addressArr.length - 1]
      }
    },
    selectItem (item, index) {
      // this.$router.back()
      this.username = item.name
      this.tel = item.tel
      this.address = item.address
      // axios.post('/api/address/update', {
      //   token: localStorage.getItem('token'),
      //   username: item.name,
      //   tel: item.tel,
      //   address: item.address,
      //   addressid: item.addressid,
      //   userid: localStorage.getItem('userid'),
      //   flag: 1
      // }).then(res => {
      //   if (res.data.code === '10119') {
      //     Toast('请先登录')
      //     this.$router.push('/login')
      //   }
      // })
    },
    onSaveaddressedit (content) {
      // this.show21 = false
      console.log(55555)
      console.log(content)
      console.log(6666)
      Toast('save')
      axios.post('/api/address/update', {
        token: localStorage.getItem('token'),
        username: content.name,
        tel: content.tel,
        address: content.addressDetail,
        addressid: this.nowaddressid,
        userid: localStorage.getItem('userid'),
        flag: content.code ? 1 : 0
      }).then(res => {
        if (res.data.data === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        } else {
          // this.$router.back()
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
              this.flag = true
              let arr = []
              res.data.data.map((item, index) => {
                item.id = index + 1
                item.name = item.username
                if (item.flag === 1) {
                  arr.push(item)
                  this.chosenAddressId = index + 1
                }
              })
              this.list = res.data.data
              if (arr.length === 0) {
                console.log('没有默认地址')
                this.username = res.data.data[0].username
                this.tel = res.data.data[0].tel
                this.address = res.data.data[0].address
              } else {
                console.log('有默认地址')
                console.log(arr)
                this.username = arr[0].username
                this.tel = arr[0].tel
                this.address = arr[0].address
              }
            }
          })
          this.show21 = false
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
    },
    onSavenewaddress (content) {
      Toast('save')
      console.log('save', content)
      axios.post('/api/address/add', {
        token: localStorage.getItem('token'),
        username: content.name,
        tel: content.tel,
        address: content.addressDetail,
        userid: localStorage.getItem('userid'),
        flag: content.code ? 1 : 0
      }).then(res => {
        if (res.data.data === '10119') {
          Toast('请先登录')
          this.$router.push('/login')
        } else {
          // this.$router.back()
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
              this.flag = true
              let arr = []
              res.data.data.map((item, index) => {
                item.id = index + 1
                item.name = item.username
                if (item.flag === 1) {
                  arr.push(item)
                  this.chosenAddressId = index + 1
                }
              })
              this.list = res.data.data
              if (arr.length === 0) {
                console.log('没有默认地址')
                this.username = res.data.data[0].username
                this.tel = res.data.data[0].tel
                this.address = res.data.data[0].address
              } else {
                console.log('有默认地址')
                console.log(arr)
                this.username = arr[0].username
                this.tel = arr[0].tel
                this.address = arr[0].address
              }
            }
          })
          this.show22 = false
          // this.addressinfo = {}
        }
      })
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
          Toast('还未添加收货地址')
          this.flag = false
        } else {
          this.flag = true
          let arr = []
          res.data.data.map((item, index) => {
            item.id = index + 1
            item.name = item.username
            if (item.flag === 1) {
              arr.push(item)
              this.chosenAddressId = index + 1
            }
          })
          this.list = res.data.data
          if (arr.length === 0) {
            console.log('没有默认地址')
            this.username = res.data.data[0].username
            this.tel = res.data.data[0].tel
            this.address = res.data.data[0].address
          } else {
            console.log('有默认地址')
            console.log(arr)
            this.username = arr[0].username
            this.tel = arr[0].tel
            this.address = arr[0].address
          }
          // res.data.data.map((item, index) => {
          //   item.id = index + 1
          //   item.name = item.username
          //   if (item.flag === 1) {
          //     this.chosenAddressId = index + 1
          //   }
          // })
          // console.log(res.data.data)
          // this.list = res.data.data
        }
      }
    })
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.box2 {
  @include rect(100%, 100%);
}
.orderInfo {
  @include rect(100%, 100%);
  text-align: center;
  @include flexbox();
  @include flex-direction(column);
  // @include justify-content(space-between);
  justify-content: space-between;
  @include align-items();
  overflow: auto;
  .top {
    @include flex();
    @include rect(100%, auto);
    overflow: auto;
    .almost {
      font: .16rem/.30rem "微软雅黑";
      display: flex;
      justify-content: space-between;
      padding: .16rem .2rem;
      border-bottom: 1px solid #eee;
      // margin: 0 .1rem;
      p {
        font-weight: bold;
        color: #666;
        width: 1.6rem;
        text-align: left;
      }
      .tip {
        font: .14rem/.28rem "微软雅黑";
        text-align: right;
      }
      h3 {
        font: .12rem/.20rem "微软雅黑";
      }
    }
    .rule {
      font: .12rem/.20rem "微软雅黑";
      margin-top: .05rem;
      a {
        color: red;
      }
    }
    .prolistOrd {
      // border: 1px solid #ccc;
      background: #eee;
      padding: .1rem 0 0 0;
      margin: .05rem 0;
      p {
        text-align: center;
        margin: .1rem 0;
        font-weight: bold;
      }
      .itemOrd {
        float: left;
        @include rect(48%, .9rem);
        @include flexbox();
        .itemimgOrd {
          @include rect(.9rem, .9rem);
          img {
            @include rect(0.8rem, 0.8rem);
            @include background-color(#eee);
            @include display(block);
            @include margin(0.05rem);
          }
        }
        .iteminfoOrd {
          @include flex();
          h3 {
            font: .12rem/.30rem "微软雅黑";
            height: .30rem;
            overflow: hidden;
          }
        }
      }
    }
  }
  .bottom {
    // height: .5rem;
    @include rect(100%, 0.5rem);
    .subBtn {
      // position: fixed;
      // left: 0;
      // bottom: 0;
      width: 100%;
      height: .5rem;
      border-radius: .3rem;
      background-color:#000;
      color: #fff;
      font: bold .18rem/.5rem '微软雅黑';
      text-align: center;
      border: 3px solid #fff;
    }
  }
}
.pop {
  text-align: center;
  margin: .2rem 0 0 .1rem;
  h2 {
    text-align: left;
    // margin: .2rem 0 0 .2rem;
  }
  .text {
    width: 80%;
    height: .4rem;
    border: 1px solid #000;
    padding: .05rem .1rem;
    margin: .4rem 0 .2rem 0;
  }
  ul {
    margin: .2rem 0;
    li {
      margin: .1rem 0;
      input {
        width: .16rem;
        height: .16rem;
      }
      span {
        vertical-align: top;
      }
    }
  }
  button {
    width: 100%;
    height: .5rem;
    border-radius: .3rem;
    background-color:#000;
    color: #fff;
    font: bold .18rem/.4rem '微软雅黑';
    text-align: center;
    border: 3px solid #fff;
  }
}
.pop2 {
  .ensure {
    button {
      background-color: #fff;
      border: 2px solid #000;
      color: #000;
    }
  }
}
</style>
