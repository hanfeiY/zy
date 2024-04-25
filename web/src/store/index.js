import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isGetterRouter:false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state,value){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["userInfo"]
  })],
})
