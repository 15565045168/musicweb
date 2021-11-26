import Vue from 'vue'
import Vuex from 'vuex'
import play from "./play"
import user from "./user"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''||localStorage.getItem("token"),
    status:false,
    name:"",
  },
  mutations: {
    setName(state,name){
      state.name=name
    }
  },
  getters: {
    getName(state){
      return state.name;
    }
  },
  modules:{
    play,
    user
  }
})
