// import axios from 'axios'

export default {
  state: {
    // loginstate: false
    loginstate: localStorage.getItem('loginstate') || false
  },
  mutations: {
    changeLoginState (state, data) {
      state.loginstate = data
    }
  }
}
