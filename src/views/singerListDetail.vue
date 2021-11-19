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
             <h4 @click="gomusic(item)">{{item.songs.name}}</h4>
             <h4 @click="bofang(item.songs)"><i :class="[$store.getters.getid==item.songs.id?$store.getters.getplaybutton:'icon-bofang'+' '+'el-el-iconfont']"></i></h4>
             <h4><i class="el-icon-star-off"></i></h4>
           </li>
       </ul>
      
      </div>
    <Foot/>
  </div>
</template>

<script>
import Foot from "../components/foot.vue"
import musicplay from "../utils/musicplay"
export default {
    data(){
        return {
          listsongid:"",
          songList:{},
          music:[]
        }
    },
    components:{
        Foot
    },
    created(){
      this.listsongid=this.$route.query.id;
      this.selectsongList();
      this.allMusic();
    },
    methods:{
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
    }

    }
}
</script>

<style lang="scss" scoped>
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
        padding-bottom:300px;
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
            height:300px;
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

}
</style>