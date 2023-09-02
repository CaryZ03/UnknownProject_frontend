import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    curUserMail: '',
    curUserID: 1,
    curTeamID: 1,
    curTeam: '',
    curUserID: '1',
    curUserName: 'Xenon',
    notificationRedNum: 5,
    curDocName: '',
    curDocID: -1
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
