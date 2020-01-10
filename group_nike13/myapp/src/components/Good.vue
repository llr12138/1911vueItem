<template>
 <ul class="goodCommit">
   <p v-if="flag">当前暂无评价呦~</p>
   <li v-else v-for="(item, index) of goodList" :key="index">
     <h3>{{ item.username }}</h3>
     <p class="proname"><span>商品名称:</span><span>{{ item.proname }}</span></p>
     <p class="sel"><span>尺码:</span><span>{{ item.sel }}</span></p>
     <p class="detail"><span>{{ item.detail }}</span></p>
   </li>
 </ul>
</template>
<script>
export default {
  props: {
    goodList: {
      type: Array
    }
  },
  data () {
    return {
      flag: false
    }
  }
  // mounted () {
  //   let li = document.querySelector('LI')
  //   console.log(li)
  // }
}
</script>
<style lang="scss">
.goodCommit{
  li{
    border-bottom: 1px solid rgb(168, 168, 168);
    margin: 10px 0;
    h3{
      text-align: left;
      font-size: 16px;
      line-height: 30px;
    }
    p{
      text-align: left;
      font-size: 14px;
      line-height: 30px;
      padding-left: 10px;
      span{
        font-size: 16px;
        letter-spacing: 1px;
      }
      &.proname, &.sel{
        line-height: 20px;
        span{
          font-size: 14px;
          color: rgb(153, 153, 153);
        }
      }
    }
  }
}
</style>
