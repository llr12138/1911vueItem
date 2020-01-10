import axios from 'axios'
export default {
  // 购物车的初始化的数据
  state: {
    cartlist: []
  },
  //  store 中的 state 中派生出一些状态
  getters: {
    totalNumber (state) {
      console.log(state)
      // return state.cartlist.filter(item => item.flag === true).length
      let num = 0
      state.cartlist.map(item => {
        item.flag ? num += item.num : num += 0
      })
      return num
    }
  },
  // 组件的异步操作
  actions: {
    getCartlist (context) {
      return new Promise((resolve, reject) => {
        axios.get('/api/cart', {
          params: {
            userid: localStorage.getItem('userid'),
            token: localStorage.getItem('token')
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '10119') {
            console.log('还未登录')
            resolve(1)
          } else if (res.data.code === '10012') {
            console.log('购物车空空如也')
            resolve(2)
          } else {
            console.log(res.data)
            // context.commit('changeCartlist', res.data.data)
            // 给数据添加了flag字段
            res.data.data.map(item => {
              item.flag = true
            })
            context.commit({
              type: 'changeCartlist',
              data: res.data.data
            })
            resolve(3)
          }
        })
      })
    }
  },
  mutations: {
    changeCartlist (state, data) {
      state.cartlist = data.data
    }
  }
}
