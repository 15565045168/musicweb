<template>
  <div class="singerlistDetail">
      <div class="title">
      </div>
      <div class="center">
       <div class="title">
        <div class="left">
            <img :src="songList.pic">
        </div>
        <div class="right">
            <h3>{{songList.title}}</h3>
            <h5>风格：{{songList.style}}</h5>
            <p>{{songList.introduction}}</p>
        </div>
       </div>
    
          <ul >
           <li>
               <h3>歌手姓名</h3>
               <h3>歌曲名称</h3>
               <h3>播放</h3>
               <h3>收藏</h3>
           </li>
           <li v-for="(item,index) in music" :key="index">
             <h4 @click="gosinger(item)">{{item.songs.auth}}</h4>
             <h4 >{{item.songs.name}}</h4>
             <h4 @click="bofang(item.songs)"><i :class="[$store.getters.getid==item.songs.id?$store.getters.getplaybutton:'icon-bofang'+' '+'el-el-iconfont']"></i></h4>
             <h4 @click="collection(item)"><i class="el-icon-star-off"></i></h4>
           </li>
       </ul>
      
      </div>
      <div class="pinglun">
          <h3>歌单评论</h3>
   <el-form ref="form" :model="ranks"  :rules="rules"  label-width="150px">
  <el-form-item   prop="score"  label="评论内容">
    <el-input style="width:72%;left:-100px;" v-model.trim="ranks.score">
        </el-input><el-button type="primary" @click="submitForm('form')">提交评论</el-button>
  </el-form-item>
     
          </el-form>
      </div>
      <ul class="ranks">
      <li v-for="(item,index) in ranklist" :key="index">
         <p><img :src="item.avator"><span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.consumerUsername}}</span></p>
         <p>{{item.score}}</p>
      </li>
      </ul>
    <Foot/>
  </div>
</template>

<script>
import Foot from "../components/foot.vue"
import musicplay from "../utils/musicplay"
import {mapGetters} from "vuex"
export default {
    data(){
        return {
          ranklist:[],
          listsongid:"",
          songList:{},
          music:[],
          ranks:{
              songListId:'',
              consumerId:"",
              score:"",
          },
           rules:{
              score:[
            { required: true, message: '请必须输入您想要评论的文字', trigger: 'blur' },
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
        
    },
    components:{
        Foot
    },
    computed:{
        ...mapGetters(["getToken","getUserId"])
    },
    created(){
      this.listsongid=this.$route.query.id;
      this.selectsongList();
      this.allMusic();
      this.rank();
    },
    methods:{
        collection(options){
       if(this.$store.getters.getToken!=null&&this.$store.getters.getToken!=""){
           console.log(options)
          var hide={
              songId:options.songs.id,
              consumerId:this.$store.getters.getUserId
          }
          this.$axios.post("api/hide/add",hide).then((res)=>{
              console.log(res);
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
        rank(){
      this.$axios.get("api/rank/rankAndSongListAll?id="+this.listsongid).then((res)=>{
          this.ranklist=res.data.data;
          console.log(this.ranklist)
      }).catch((error)=>{
          console.log(error)
      })
        },
        bofang(options){
            console.log(options)
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
       },
        selectsongList(){
      this.$axios.get("api/songList/selectById?id="+this.listsongid).then((res)=>{
          this.songList=res.data.data;
          console.log(this.songList)
      })  
    },
    allMusic(){
    this.$axios.get("/api/listSong/allMusic?id="+this.listsongid).then((res)=>{
        console.log(res.data.data);
        this.music=res.data.data;
    })
    },
    gosinger(options){
        console.log(options);
        this.$router.push({
            path:"/singerDetail",
            query:{
                id:options.songs.singerId
            }
        })
    },
    gomusic(options){
        console.log(options);
        this.$router.push({
            path:"/song",
            query:{
                id:options.songs.id
            }
        })
    },
     submitForm(formName) {
         console.log(this.getToken)
        if(this.getToken==null ||this.getToken==""){
              this.$message.error('请登陆后再进行评论');
          return;   
        }
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var rank={
              songListId:this.listsongid,
              consumerId:this.getUserId,
              score:this.ranks.score,
              };
              console.log(rank)
          this.$axios.post("api/rank/add",rank).then((res)=>{
              console.log(res)
           if(res.data.code==10000){
             this.$notify({
          title: '消息提示',
          message: res.data.message,
          type: 'success'
        });
        this.ranks.score="";
        this.rank()
            }else if(res.data.code==10001){
             this.$notify.error({
             title: '错误',
             message:res.data.data
        }); 
            }
          }).catch((error)=>{

          })
          } else {
            return false;
          }
        });
      },

    }
}
</script>

<style lang="scss" scoped>
.el-form{
    margin:10px;
    padding-bottom:20px;
}
.el-form-item__error {
    left:100px !important;
}
.singerlistDetail{
    width:100%;
    height:auto;
    .title{
        width:100%;
        height:400px;
        background:url("../image/huoying.jpg") no-repeat;
       background-size:auto;
    }
    .center{
        width:1200px;
        margin:auto;
        margin-top:-150px;
        height:auto;
        padding-bottom:100px;
        .title{
        width:100%;
        height:250px;
        background:#FEDCC1;
        border-radius: 10px 10px 0px 0px; 
        .left{
            float:left;
            width:200px;
            height:250px;
            position:relative;
            img{
                display: inline-block;
                width:150px;
                height:auto;
                border-radius:10px;
                position:absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin:auto;
                
            }
        } 
        .right{
            float:left;
            width:600px;
            padding-top:50px;
            h3{
                text-align: left;
                 width:600px;
                line-height:30px;
                font-size:18px;
            }
            h5{
                 width:600px;
                line-height:30px;
                text-align: left;
            }
            p{
                 width:600px;
                font-size:14px;
                line-height:20px;
                text-align: left;
                color:#A2A8B1;
            }
        } 
        }
        ul{
            width:1200px;
            height:auto;
            overflow: hidden;
            padding-bottom:20px;
             display: flex;
          flex-direction:column;
            li:nth-of-type(1){
                width:100%;
                height:90px;
                border-bottom: 3px solid #000;
               h3{
                    float:left;
                width:200px;
                line-height:90px;
                text-align: center;
               }
            }
            li{
                list-style: none;
                width:100%;
                height:80px;
                border-bottom: 1px solid #000;
                h4{
                    box-sizing: border-box;
                float:left;
                width:200px;
                line-height:80px;
                text-align: center;   
                i{
                    font-size:30px;
                }
                }
             
            }
        }
    }
    .pinglun{
        width:1200px;
        height:100px;
        margin:auto;
        padding-bottom: 20px;
        h3{
            width:100%;
            line-height:50px;
            color:#409EFF;
            text-align: left;
            border-bottom: 1px solid #888;
        }
    }
    .ranks{
        width:1000px;
        height:auto;
        margin:auto;
        overflow: hidden;
        padding-bottom:50px;
        li{
            width:100%;
            height:auto;
            list-style: none;
            overflow: hidden;
            padding-top:10px;
            padding-bottom:10px;
            border-bottom:1px solid #888;
        p{
            float:left;
            line-height:20px;
            font-size:14px;
            text-align: left;
        }
        p:nth-of-type(1){
            width:20%;
            display: flex;
            align-items:center;
            justify-content: center;
            img{
                width:40px;
                height:40px;
                line-height:center;
                border-radius:50%;
                
            }
            span{
                line-height:20px;
            }
        }
        p:nth-of-type(2){
            width:70%;
        }
        
        }
    }
}

</style>