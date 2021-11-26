import axios from 'axios';
import vuex from "../store/index"
import router from '../router';
import Vue from 'vue';
let v = new Vue();

//设置过期时间
axios.defaults.timeout = 6000;
// 添加请求拦截器
// http request 拦截器
axios.defaults.headers.common['token'] =vuex.getters.getToken;
axios.interceptors.request.use(
    config => {
      // console.log(config)
      // 自定义header信息（比如token）
      // console.log("请求拦截器添加userId-----------",sessionStorage.userId)
      if(!config.headers['token']){
        config.headers['token'] = vuex.getters.getToken
      }
      // console.log(config)
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  

//请求拦
//响应拦截
axios.interceptors.response.use((res) => {
    if(res.data.code===10002){
      this.$store.commit("setToken","");
      this.$store.commit("setUserAvator","");
      this.$store.commit("setUserId","");
      this.$store.commit("setUserEmail","");
      this.$store.commit("setUserId","");
      this.$store.commit("setUserIntroduction","");
      this.$store.commit("setUserPhoneNum","");
      this.$store.commit("setUsername","");
        router.push("/login");
       v.$notify({
            title: "登陆信息已过期请重新登录",
            message: res.data.message,
            type: "error",
          });
          return;
          
    }
    return res;

},err=>{
    v.$notify({
        title: "提示消息",
        message:"服务器错误",
        type: "error",
      });
})
export default axios;