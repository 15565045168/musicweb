<template>
  <div class="singerdetail">
    <div class="center">
    <div class="body">
     <li class="left">
       <h2>&nbsp;&nbsp;&nbsp;&nbsp;{{obj.name}}</h2>
       <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别:<span v-text="obj.sex"></span></h3>
       <p>&nbsp;&nbsp;&nbsp;&nbsp;{{obj.introduction}}</p>
     </li>
     <li class="right">
         <img :src="obj.pic"/>
     </li>
    </div>
    <div class="song">
     <div class="center">
        <div class="title">
            <h2 :class="isshow=='one'?'singer':''"  @click="show('one')">歌手专辑</h2>
            <h2  :class="isshow=='two'?'singer':''" @click="show('two')">歌手音乐</h2>
        </div>

       <ul  v-show="isshow=='one'">
         <li v-for="(item,index) in albumList" :key="index" @click="godeail(item)">
         <img :src="item.pic">
         <h5>{{item.name}}</h5>
         </li>
       </ul>
       <ul v-show="isshow=='two'"  >
           <li>
               <h3>歌手姓名</h3>
               <h3>歌曲名称</h3>
               <h3>播放</h3>
               <h3>收藏</h3>
           </li>
           <li v-for="(item,index) in music" :key="index">
             <h4>{{obj.name}}</h4>
             <h4 @click="gomusic(item)">{{item.name}}</h4>
             <h4 @click="bofang(item)"><i :class="[$store.getters.getid==item.id?$store.getters.getplaybutton:'icon-bofang'+' '+'el-el-iconfont']"></i></h4>
             <h4><i class="el-icon-star-off"></i></h4>
           </li>
       </ul>
     </div>
    </div>
     <Foot/>
    </div>
   
  </div>
</template>
<script>
import data from "../utils/data"
import Foot from "../components/foot.vue"
import musicplay from "../utils/musicplay"
export default {
   data(){
      return{
       obj:{},
       isshow:'one',
       albumList:[],
       music:[]
      }
   },
   components:{
     Foot
   },
   created(){
        var id=this.$route.query.id;
       this.new(id);
       this.album(id);
       this.musicAll(id);
   },
   methods:{
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
               musicplay.musicplay(options.id,options.url,options.pic,this.obj.name,options.name,options.lynic);
               this.$store.commit("setlistofsongs",options);
               this.$store.commit("setsongindex",options.id)
           }
       },
      new(options){
 this.$axios.get("api/singer/singerSelectById?id="+options).then((res)=>{
      var birthday=data.date(res.data.data.birthday)
      res.data.data.birthday=birthday;
      var sex=data.sex(res.data.data.sex);
      res.data.data.sex=sex;
      this.obj=res.data.data;
   })
      },
      gomusic(options){
// /singerDetail?id=1458731018772156416
console.log(options)
  this.$router.push({
      path:"/song",
      query:{
          id:options.id
      }
  })
      },
      godeail(options){
          console.log(options);
        this.$router.push({
            path:"/albumDetail",
            query:{
               albumId:options.id,
               singerId:options.singerId 
            }
        })
      },
      show(options){
          this.isshow=options
      },
      album(options){
       this.$axios.get("api/album/albumAll?id="+options).then((res)=>{
           this.albumList=res.data.data.slice(0,10);
       })
      },
      musicAll(options){
      this.$axios.get("api//song/songall?id="+options).then((res)=>{
          this.music=res.data.data;
      })
      }
   }

}
</script>

<style lang="scss" scoped>
 .singerdetail{
     width:100%;
     height:auto;
     .center{
         width:100%;
         height:500px;
         background:#E8E8E8;
         .body{
             width:1200px;
             height:500px;
             position:relative;
             top:0;
             left:0;
             right:0;
             bottom:0;
             margin:0 auto;
            li{
                list-style-type: none;
                position:absolute;
                height:500px;
             }
             li:nth-of-type(1){
                 left:0;
                 width:700px;
                 height:500px;
                 h2{
                     margin-top:30px;
                     line-height:50px;
                     text-align: left;
                     color:#409EFF;
                 }
                 h3{
                     text-align: left;
                     font-size:18px;
                     line-height:50px;
                     
                 }
                 p{
                     text-align: left;
                     line-height:25px;
                     font-size:14px;
                     padding:20px;
                 }
             }
              li:nth-of-type(2){
                 right:0;
                 width:350px;
                 height:500px;
                 box-sizing: border-box;
                 overflow: hidden;
                 padding-top:20px;
                 img{
                     width:300px;
                     margin-top:10px;
                     height:auto; 
                     display:inline-block;
                     margin:auto;
                 }
             }
         }
         .song{
             width:100%;
             height:auto;
             .center{
                 width:1200px;
                 height:auto;
                 margin:auto;
                 background:#fff;
                 .title{
                     width:100%;
                     height:40px;
                h2{
                    float:left;
                    width:150px;
                    line-height:80px;
                    font-size:20px;
                }
                 }

                 ul:nth-of-type(1){
                     margin-top:100px;
                     width:100%;
                     height:100%;
                     padding-bottom: 100px;
                     overflow: hidden;
                     li{
                         list-style: none;
                         float:left;
                         width:200px;
                         height:200px;
                         margin: 20px 10px 20px 20px;
                         img{
                             display: inline-block;
                             width:150px;
                             height:150px;
                         }
                     }
                 }
                 ul:nth-of-type(2){
                    width:100%;
                    min-height:500px;
                    margin-top:100px;
                    padding-bottom: 100px;
                    li:nth-of-type(1){
                        width:100%;
                        height:100px;
                        margin:auto;
                        border-bottom:3px solid #000;
                        h3{
                            float:left;
                            line-height:90px;
                            width:200px;
                            font-size:18px;
                        }
                    }
                    li{
                        list-style: none;
                        width:100%;
                        height:70px;
                        border-bottom: 1px solid #000;
                        margin:0 auto;
                       display:flex;
                       justify-content: left;

                        h4{
                            line-height:70px;
                            width:200px;
                            text-align: center;
                        }
                        h4 i{
                            font-size:20px;
                        }
                    }
                 }
                 
             }
         }
        



     }
 }
 .singer{
     color:#409EFF;
     border-bottom: 2px solid #409EFF;
 }
</style>