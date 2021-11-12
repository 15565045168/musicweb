<template>
  <div class="title">
      <ul>
    <li></li>
    <li @click="gohome('home')" :class="[activeid=='home'?'active':'']">首页</li>
    <li @click="gosinglist('singerlist')"  :class="[activeid=='singerlist'?'active':'']">歌单</li>
    <li @click="gosinger('singer')"  to="/singer" :class="[activeid=='singer'?'active':'']">歌手</li>
    <li @click="gomymusic('mymusic')" to="/mymusic" :class="[activeid=='mymusic'?'active':'']">我的音乐</li>
    <li><input type="text" active-class="active" v-model="text"><el-button type="primary" icon="el-icon-search" @click="gosearch('search')">搜索</el-button></li>
    <div v-if="text==0">
        图片
    </div>
    <div  v-else>
     <li @click="gologin('login')" to="/login" :class="[activeid=='login'?'active':'']">登录</li>
     <li @click="goregister('register')" to="/register" :class="[activeid=='register'?'active':'']">注册</li>
    </div>
      </ul>
  </div>
</template>

<script>
export default {
     data(){
         return {
             text:"8",
             activeid:""
         }
     },
     created(){
        console.log(this.$route.path)
        switch(this.$route.path){
             case "/":
             this.activeid="home";
             break;
            case "/home":
             this.activeid="home";
             break;
            case "/singerlist":
            this.activeid="singerlist"
            break;
              case "/singer":
            this.activeid="singer"
            break;
              case "/mymusic":
            this.activeid="mymusic"
            break;
            case "/search":
                this.activeid=""
                break;
                case "/login":
                this.activeid="login"
                break;
                case "/register":
                this.activeid="register"
                break;
        }
     },
     methods:{
         gohome(options){
          this.activeid=options;
           this.$router.push({
                 path:"/"
             }).catch(()=>{})
         },
         gosinglist(options){
             this.activeid=options;
             this.$router.push({
                 path:"/"+options
             }).catch(()=>{})
         },
         gosinger(options){
            this.activeid=options;
             this.$router.push({
                 path:"/"+options
             }).catch(()=>{})
         },
         gomymusic(options){
               this.activeid=options;
             this.$router.push({
                 path:"/"+options
             }).catch(()=>{})
         },
         gosearch(options){
              this.activeid="";
            this.$router.push({
                 path:"/"+options
             }).catch(()=>{})
         },
         gologin(options){
           this.activeid=options;
             this.$router.push({
                 path:"/"+options
             }).catch(()=>{})   
         },
         goregister(options){
            this.activeid=options;
             this.$router.push({
                 path:"/"+options
             }).catch(()=>{})     
         }

     }
}
</script>

<style lang="scss" scoped> 
.title{
    width:100%;
    height:60px;
    margin:auto;
    text-align: left;
    box-shadow:5px 10px 10px -5px #888888;
    ul{
        width:1200px;
        height:100%;
        margin:auto;
         li{
        width:100px;
        height:60px;
        list-style: none;
        float:left;
        line-height:60px;
        text-align: center;
        font-size:15px;
        font-weight:600;
    }
    li:nth-of-type(6){
        width:400px;
        text-align: left;
        line-height:60px;
        input{
            width:300px;
            height:40px;
            border:none;
            background:#EAEEF1;
            border-radius: 5px 0px 0px 5px;
            outline: none;
            padding-left:20px;
            box-sizing: border-box;
        }
    }
    }
   
 
  }

  .active{
      color:#95CCF4;
      border-bottom: 2px solid #95CCF4;
  }
</style>