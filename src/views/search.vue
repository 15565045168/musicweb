<template>
  <div class="search">
      <ul >
          
           <li v-for="(item,index) in singer" :key="index" @click="gosinger(item)">
            <p><img :src="item.pic"></p>
            <p>{{item.name}}</p>
            <p>歌手</p>
           </li>
           <ol>
              <li v-for="(item,index) in song" :key="index">
             <h4>{{item.name}}</h4>
             <h4 @click="bofang(item)"><i :class="[$store.getters.getid==item.id?$store.getters.getplaybutton:'icon-bofang'+' '+'el-el-iconfont']"></i></h4>
            <h4 @click="collection(item)"><i class="el-icon-star-off"></i></h4>
           </li>
             </ol>   
                 </ul>
                 
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import musicplay from "../utils/musicplay"
export default {
  data(){
    return {
        name:'',
        singer:[],
        song:[],
        
    }
  },
  created(){
     this.new();
  },
  computed:{
    ...mapGetters(["getName"])
  },
  watch:{
   getName(options){
   this.updata(options)
   }
  },
  methods:{
         collection(options){
           
          if(this.$store.getters.getToken!=null&&this.$store.getters.getToken!=""){
          var hide={
              songId:options.id,
              consumerId:this.$store.getters.getUserId
          }
          this.$axios.post("api/hide/add",hide).then((res)=>{
              if(res.data.code=10000){
                    this.$notify({
          title: '消息提示',
          message: res.data.data,
          type: 'success'
        });
              }else{
        this.$notify({
          title: '消息提示',
          message: res.data.data,
          type: 'success'
        });
              }
          }).catch((error)=>{
              consoel.log(error)
          })
          }else{
             this.$notify.error({
          title: '消息提示',
          message: '您还没有登陆请登录后再进行收藏'
        });
          }
       },
    gosinger(item){
      this.$router.push({
        path:"/singerDetail",
        query:{
          id:item.id
        }
      })
    },
   new(){
      if (this.getName != "") {
        this.$axios.get("api/song/name?name=" + this.getName)
        .then((res) => {
         console.log(res)
         this.song = res.data.data;
        });
        this.$axios
          .get("api/singer/selectName?name=" + this.getName)
          .then((res) => {
            console.log(res)
            this.singer = res.data.data;
          });
        
      }
    },
    updata(options){
       if (options != "") {
        this.$axios
          .get("api/singer/selectName?name=" + options)
          .then((res) => {
            console.log(res)
            this.singer = res.data.data.slice(0, 3);
          });
        this.$axios.get("api/song/name?name=" + options).then((res) => {
          console.log(res)
          this.song = res.data.data;
        });
      }
    },
      bofang(options){
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
               musicplay.musicplay(options.id,options.url,options.pic,options.auth,options.name,options.lynic);
               this.$store.commit("setlistofsongs",options);
               this.$store.commit("setsongindex",options.id)
           }
       }
   
  }

}
</script>

<style lang="scss" scoped>
.search{
  width:100%;
  height:auto;
  ul{
    background:#EAEEF1;
    border-radius:0 0 20px 20px;
    width:800px;
    height:auto;
    margin:0 auto;
    overflow: hidden;
    
    li{
      border-bottom: 1px solid #fff;
       display:flex;
      justify-content:left;
      p{
        width:200px;
        height:90px;
        text-align: center;
        line-height:90px;
        font-size:20px;
        font-weight:600;
        img{
          margin-top:10px;
          width:60px;
          height:60px;
          border-radius:50%;
        }
      }
    }
    ol{
      width:100%;
      background:#EAEEF1;
    border-radius:0 0 20px 20px;
    width:800px;
    height:auto;
    margin:0 auto;
    overflow: hidden;
    li{
       border-bottom: 1px solid #fff;
       display:flex;
      justify-content:left;
      h4{
        width: 150px;
        line-height:60px;
        font-size:20px;
        text-align: center;
        
      }
    }
    }
  }


}
</style>