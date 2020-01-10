<template>
 <ul class="badCommit">
   <li v-for="(item, index) of badList" :key="index">
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
    badList: {
      type: Array
    }
  }
}
</script>
<style lang="scss">
.badCommit{
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
