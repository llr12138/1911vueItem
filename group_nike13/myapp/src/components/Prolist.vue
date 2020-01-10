<template>
  <div class="box">
    <h1 class="wall-header-title">所有产品</h1>
    <div class="prolist">
      <div class="smallpro" v-for="item of prolist" @click="toDetail(item.proid)" :key="item.proid">
        <img :src="item.proimg" alt="">
        <span>{{ item.proname }}</span>
        <h2>售价：￥{{ item.price }}.00</h2>
        <i class="iconfont icon-ziyuan"></i>
      </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    prolist: {
      type: Array
    }
  },
  methods: {
    toDetail (proid) {
      // this.$router.push('/detail/' + proid)
      // this.$router.push({ name: 'detail', params: { proid } })
      this.$router.push({ path: '/detail/' + proid })
    }
  }
}
</script>

<style lang="scss">
.box{
  background-color: #Fff;
  .wall-header-title{
    font-size: 22px;
    font-weight: 500;
    padding-top: .1rem;
    padding-bottom: .1rem;
    // padding-left: .1rem;
  }
  .prolist {
    // margin-left: 5%;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    width: 100%;
    .smallpro {
      width: 50%;
      height: 2.2rem;
      // margin-right: 4%;
      // margin-left: 1%;
      margin-bottom: 0.25rem;
      position: relative;
      img {
       width: 1.7rem;
      //  margin: 0;
      }
      span {
        margin-top: .1rem;
        display: block;
        width: 1.46rem;
        height: .42rem;
      }
      i {
        position: absolute;
        top: 2.1rem;
        right: 0;
      }
    }
  }
}
.smallpro:nth-of-type(2n+1){
    padding-left: 0px;
    padding-right: 3px;
}
</style>
