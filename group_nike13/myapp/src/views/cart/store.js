import axios from 'axios'
export default {
  // 购物车的初始化的数据
  state: {
    cartlist: []
  },
  //  store 中的 state 中派生出一些状态
  getters: {
    totalNumber (state) {
      // return state.cartlist.filter(item => item.flag === true).length
      let num = 0
      if (state.cartlist.length !== 0) {
        num = state.cartlist.length
      }
      // state.cartlist.map(item => {
      //   item.flag ? num += item.num : num += 0
      // })
      return num
    },
    totalPrice (state) {
      // return state.cartlist.filter(item => item.flag === true).length
      let price = 0
      state.cartlist.map(item => {
        item.flag ? price += item.num * item.price : price += 0
      })
      return price * 100
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
          if (res.data.code === '10119') {
            resolve(1)
          } else if (res.data.code === '10012') {
            resolve(2)
          } else {
            // context.commit('changeCartlist', res.data.data)
            // 给数据添加了flag字段
            res.data.data.map(item => {
              item.flag = false
            })
            context.commit({
              type: 'changeCartlist',
              data: res.data.data
            })
            resolve(3)
          }
        })
      })
    },
    deleteItem (context, params) {
      return new Promise(resolve => {
        axios.get('/api/cart/delete', {
          params: {
            token: localStorage.getItem('token'),
            cartid: params.cartid
          }
        }).then(res => {
          if (res.data.code === '10119') {
            resolve(1)
          } else {
            let arr = context.state.cartlist
            arr.splice(params.index, 1)
            context.commit({
              type: 'changeCartlist',
              data: arr
            })
            resolve(2)
          }
        })
      })
    },
    addNum (context, { item }) {
      return new Promise(resolve => {
        axios.get('/api/cart/update', {
          params: {
            token: localStorage.getItem('token'),
            cartid: item.cartid,
            num: item.num + 1
          }
        }).then(res => {
          if (res.data.code === '10119') {
            resolve(1)
          } else {
            resolve(2)
          }
        })
      })
    },
    reduceNum (context, { item }) {
      return new Promise(resolve => {
        axios.get('/api/cart/update', {
          params: {
            token: localStorage.getItem('token'),
            cartid: item.cartid,
            num: item.num - 1
          }
        }).then(res => {
          if (res.data.code === '10119') {
            resolve(1)
          } else {
            resolve(2)
          }
        })
      })
    }
  },
  mutations: {
    changeCartlist (state, data) {
      state.cartlist = data.data
    },
    changeFlag (state, data) {
      state.flag = data
    }
  }
}
