<template>
  <div class="box">
    <header class="header">
      <div class="kind">
        <span class="kindtip">分类</span>
      </div>
    </header>
    <div class="content" id="content">
      <div class="kind">
        <!-- 分类的导航条 -->
        <div class="kind-nav">
          <ul>
            <li :class="kindindex === index ? 'active' : ''" v-for="(item, index) of kindlist" :key="index" @click="getlist(item, index)">{{ item }}</li>
          </ul>
        </div>
        <!-- 分类的主要内容 -->
        <Prolist :prolist = "prolist"/>
        <!-- 返回顶部和直通购物车 -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Prolist from '@/components/Prolist'
// import Back from '@/components/Back'
// import BackTop from '@/components/backTop'
// import Search from '@/components/search2'
export default {
  components: {
    Prolist
  },
  data () {
    return {
      kindlist: [],
      prolist: [],
      kindindex: 0
    }
  },
  created () {
    let url = '/pro/type?type=type'
    axios.get(url).then(res => {
      if (localStorage.getItem('token')) {
        this.kindlist = res.data.data
        this.getlist(this.kindlist[0], 0)
      } else {
        this.$router.push('/login')
      }
    })
  },
  methods: {
    getlist (item, index) {
      this.kindindex = index
      // let token = localStorage.getItem('token')
      let url = '/pro/witchtype?type=' + item
      axios.get(url).then((res) => {
        if (res.data.code === '10119') {
          this.$router.push('/login')
        } else {
          this.prolist = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';
.content {
  .kind {
    @include rect(100%, 100%);
    @include flexbox();
    @include flex-direction(column);
    .kind-nav {
      ul {
        @include background-color(#fff);
        @include rect(100%, 0.4rem);
        @include flexbox();
        @include justify-content(space-around);
        li {
          @include flexbox();
          @include flex-direction();
          @include border(0 0 1px, #efefef, solid);
          @include line-height(0.4rem);
          @include text-align();
          @include color(#000);
          &.active {
            @include color(#000);
            border-bottom: 2px solid rgb(0, 0, 0);
          }
        }
      }
    }
  }
}
.header {
  background-color: bisque;
  .kind {
    .kindtip {
    position: absolute;
    top: .13rem;
    left: 1.75rem;
    font-size: 17px;
    }
  }
}
</style>
