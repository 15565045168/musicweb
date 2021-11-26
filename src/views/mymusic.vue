<template>
  <div class="mymusic">
  <div class="center">
    <div class="left">
      <div><img :src="getUserAvator"/></div>
      <div>
       <h3><span>用户名称：</span>{{getusername}}</h3>
       <h4><span>手机号码：</span>{{getUserPhoneNum}}</h4>
       <h4><span>用户邮件：</span>{{getUserEmail}}</h4>
       <h4><span>个性签名：</span></h4>
      <h5>{{getUserIntroduction}}</h5>
      </div>
      
    </div>
    <div class="right">
       <ul >
           <li>
               <h3>歌手姓名</h3>
               <h3>歌曲名称</h3>
               <h3>播放</h3>
               <h3>删除</h3>
           </li>
           <li v-for="(item,index) in music" :key="index">
             <h4 @click="gosinger(item)">{{item.singerName}}</h4>
             <h4>{{item.songName}}</h4>
             <h4 @click="bofang(item)"><i :class="[$store.getters.getid==item.songId?$store.getters.getplaybutton:'icon-bofang'+' '+'el-el-iconfont']"></i></h4>
             <h4 @click="del(item,index)"><i class="el-icon-delete-solid"></i></h4>
           </li>
       </ul>
    </div>
  </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex"
import musicplay from "../utils/musicplay"
export default {
  data(){
    return {
       music:[]  
    }
  },
  created(){
       if(this.$store.getters.getToken!=null&&this.$store.getters.getToken!=""){
         this.new();
       }else{
            this.$notify.error({
          title: '消息提示',
          message: '您还没有登陆请登录后在查看我的音乐'
        });
        this.$router.go(-1)
       }
  },
  computed:{
    ...mapGetters(["getUserEmail",
     "getusername","getUserPhoneNum","getUserIntroduction",
     "getUserAvator","getUserId"
    ])
  },
  methods:{
    new(){
      this.$axios.get("api/hide/userId?id="+this.getUserId).then((res)=>{
        console.log(res)
        this.music=res.data.data;
      })
    },
    gosinger(options){
      this.$router.push({
        path:"singerDetail",
        query:{
          id:options.singerId
        }
      })
    },
     bofang(options){
            console.log(options)
            this.$axios.get("api/song/selectById?id="+options.songId).then((res)=>{
              let options=res.data.data;
                if(options.id==this.$store.getters.getid){
             if(this.$store.state.play.isplay){
             this.$store.commit("setisplay",false);
             this.$store.commit("setplaybutton","icon-bofang"+' '+'el-el-iconfont');
             this.$store.commit("setlistofsongs",options);
             }else{
              this.$store.commit("setisplay",true);
              this.$store.commit("setplaybutton","icon-zanting"+' '+'el-el-iconfont')
             this.$store.commit("setlistofsongs",options);
            }
           }else{
               musicplay.musicplay(options.id,options.url,options.pic,options.name,options.name,options.lynic);
               this.$store.commit("setlistofsongs",options);
                this.$store.commit("setsongindex",options.id)
           }
            
            }).catch((error)=>{
              console.log(error)
            })
     
       },
       del(item,index){
         this.$axios.get("api/hide/delById?id="+item.id).then((res)=>{
           console.log(res.data)
           if(res.data.code==10000){
              this.$notify({
          title: '消息提示',
          message: res.data.data,
          type: 'success'
        });
        this.music.splice(index,1)
           }else{
              this.$notify.error({
             title: '错误',
             message:res.data.data
        }); 
           }
         })
       }
  }
}
</script>

<style lang="scss" scoped>
.mymusic{
  width:100%;
  height:auto;
  position:relative;
  .center{
    width:1200px;
    position:absolute;
    left:0;
    right:0;
    margin:auto;
  }
  div{
    float:left;
    box-sizing: border-box;
  }
  .left{
    margin-top:50px;
    width:40%;
    height:500px;
    div:nth-of-type(1){
      width:110px;
      height:200px;
      float:left;
      position:relative;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width:100px;
        height:100px;
        border-radius: 50%;
      }
    }
    div:nth-of-type(2){
      float:left;
      width:70%;
      margin-left:30px;
      h3{
        text-align:left;
        line-height:80px;
        span{
          color:#21A3FE;
        }
      }
      h4{
        text-align: left;
        line-height:40px;
        span{
          color:#21A3FE;
        }
      }
      h5{
        width:300px;
        text-align:left;
        font-size:14px;
      }
    }
  }
  .right{
    width:60%;
    height:300px;
    box-sizing: border-box;
    margin-top:50px;
    ul{
      width:100%;
      height:auto;
      li:nth-of-type(1){
       width:100%;
       border-bottom: 1px solid #888;
       h3{
         float: left;
         width:150px;
         line-height:60px;
         text-align: center;
         font-size:20px;
       }
      }
      li{
        list-style: none;
        display:flex;
        border-bottom: 1px solid #888;
        justify-content: left;
        h4{
         width:150px;
         font-size:14px;
         line-height:50px;
      
        }

      }
    }
  }
}
</style>