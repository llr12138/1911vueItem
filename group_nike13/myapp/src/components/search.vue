<template>
  <div class="box">
    <div class="content">
        <form action="/">
      <van-search
        v-model='key'
        placeholder="请输入搜索关键词"
        show-action
        @cancel="onCancel"
        @keyup='search'
      />
    </form>
    <div v-for="item of prolist" :key="item.proid">
      <p :to="'/pro/detail/？proid= ' + item.proid"></p>
    </div>
    <Prolist :prolist = "prolist"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import Prolist from '@/components/Prolist'
import { Search } from 'vant'
Vue.use(Search)
export default {
  components: { Prolist },
  data () {
    return {
      key: '',
      prolist: []
    }
  },
  methods: {
    onCancel () {
      this.$router.push('/home')
    },
    search () {
      console.log(this.key)
      axios.get('/api/pro/search', { params: {
        key: this.key
      } }).then(res => {
        console.log(123)
        this.prolist = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
</style>
