<template>
  <div class="box">
    <div class="comment-header">
      <i @click="toBack" class="iconfont icon-fanhui"></i>
      <u class="iconfont icon-fenxiang"></u>
    </div>
    <div class="count commentCount">
      <div class="commit-list">
        <u :class="CactiveClass == index ? 'actived':''" v-for="(item,index) in commitKind" :key="index" @click.stop="getCommit(index)">
          {{item}}
        </u>
        <i v-for="(item,index) in commitKind" :key="index+3" class="activatedOne" v-show="CactiveClass===index">
          <Good v-show="0===index" :goodList='goodList'/>
          <Center v-show="1===index" :centerList='centerList'/>
          <Bad v-show="2===index" :badList='badList'/>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import Good from '@/components/Good'
import Center from '@/components/Center'
import Bad from '@/components/Bad'
import axios from 'axios'
export default {
  data () {
    return {
      commitKind: ['好评', '中评', '差评'],
      CactiveClass: 0,
      commentList: [],
      goodList: [],
      centerList: [],
      badList: []
    }
  },
  components: {
    Good,
    Center,
    Bad
  },
  methods: {
    toBack () {
      this.$router.back()
    },
    getCommit (index) {
      this.CactiveClass = index
    }
  },
  mounted () {
    let { proid } = this.$route.params
    axios.get('/api/pro/detail?proid=' + proid).then(res => {
      this.proimg = res.data.data.proimg
      this.proname = res.data.data.proname
      this.price = res.data.data.price
      this.proid = res.data.data.proid
      this.detail = res.data.data.detail
      this.itemList = res.data.data.sel.split('/')
      this.type = res.data.data.type
      this.commentList = res.data.data.list
      this.commentList.map(item => {
        if (item.type === 0) {
          this.goodList.push(item)
        } else if (item.type === 1) {
          this.centerList.push(item)
        } else if (item.type === 2) {
          this.badList.push(item)
        }
      })
    })
  }
}
</script>
<style lang="scss">
.comment-header{
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
.commentCount{
  margin-top: 46px;
  .commit-list{
    height: auto;
    padding: 20px;
    text-align: center;
    u{
      display: inline-block;
      font-size: 12px;
      padding: 4px 14px;
      border: 1px solid rgb(173, 173, 173);
      border-radius: 10px;
      margin: 0 10px;
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
}
</style>
