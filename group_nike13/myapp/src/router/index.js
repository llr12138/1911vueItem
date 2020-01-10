import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '@/components/Footer'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    // component: () => import('@/views/home/index.vue')
    components: {
      default: () => import('@/views/home/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/kind',
    name: 'kind',
    components: {
      default: () => import('@/views/kind/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/comment/:proid',
    name: 'comment',
    components: {
      default: () => import('@/views/comment/index.vue')
    }
  },
  // :orderid-------------------------↓
  {
    path: '/commentInput/:orderid',
    name: 'commentInput',
    components: {
      default: () => import('@/views/commentInput/index.vue')
    }
  },
  {
    path: '/cart',
    name: 'cart',
    components: {
      default: () => import('@/views/cart/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/user',
    name: 'user',
    components: {
      default: () => import('@/views/user/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/addresslist',
    name: 'addresslist',
    components: {
      default: () => import('@/views/addresslist/index.vue')
    }
  },
  {
    path: '/addressadd',
    name: 'addressadd',
    components: {
      default: () => import('@/views/addresslist/add.vue')
    }
  },
  {
    path: '/addressedit/:addressid',
    name: 'addressedit',
    components: {
      default: () => import('@/views/addresslist/edit.vue')
    }
  },
  {
    path: '/order/:orderid',
    name: 'order',
    components: {
      default: () => import('@/views/order/index.vue')
    }
  },
  // {
  //   path: '/detail',
  //   name: 'detail',
  //   components: {
  //     default: () => import('@/views/detail/index.vue')
  //   }
  // },
  {
    path: '/detail/:proid', // :proid 代表就是路由的参数
    name: 'detail',
    components: {
      default: () => import('@/views/detail/index.vue')
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      default: () => import('@/views/register/index.vue')
    }
  },
  {
    path: '/register2',
    name: 'register2',
    components: {
      default: () => import('@/views/register2/index.vue')
    }
  },
  {
    path: '/sets',
    name: 'sets',
    components: {
      default: () => import('@/views/sets/index.vue')
    }
  },
  {
    path: '/sets2',
    name: 'sets2',
    components: {
      default: () => import('@/views/sets2/index.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('@/views/login/index.vue')
    }
  },
  {
    path: '/alipay/:orderid',
    name: 'alipay',
    components: {
      default: () => import('@/views/pay/alipay.vue')
    }
  },
  {
    path: '/wechart/:orderid',
    name: 'wechart',
    components: {
      default: () => import('@/views/pay/wechart.vue')
    }
  },
  // {
  //   path: '/search',
  //   name: 'search',
  //   components: {
  //     default: () => import('@components/search.vue')
  //   }
  // },
  {
    path: '/ordercenter',
    name: 'ordercenter',
    components: {
      default: () => import('@/views/ordercenter/index.vue')
    }
  },
  {
    path: '**',
    name: 'notfound',
    component: () => import('@/views/notfound/index.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
