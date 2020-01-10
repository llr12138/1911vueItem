<template>
  <footer class="footer">
    <ul>
      <router-link to="/home" tag="li">
        <p><i class="iconfont icon-tianchongxing-"></i></p>
      </router-link>
      <router-link to="/kind" tag="li">
        <p><i class="iconfont icon-quanbufenlei"></i></p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span>{{ totalNumber }}</span>
        <p><i class="iconfont icon-tianchongxing-1"></i></p>
      </router-link>
      <router-link to="/user" tag="li">
        <p><i class="iconfont icon-icon-test"></i></p>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      totalNumber: 'totalNumber'
    })
  }
}
</script>
