import Vue from 'vue'
import Vuex from 'vuex'
import play from "./play"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''||localStorage.getItem("token"),
    status:false,
    
  },
  mutations: {
  },
  getters: {
  },
  modules:{
    play
  }
})
