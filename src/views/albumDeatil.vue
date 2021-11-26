<template>
  <div class="albumDetail">
      <div class="title">

      </div>
       <div class="center">
         <div class="title-center">
             <div class="left">
                 <img :src="album.pic">
             </div>
             <div class="right">
                  <h3>{{album.name}}</h3>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;简介：{{album.body}}</p>
             </div>
         </div>
         <ul>
           <li>
               <h3>歌手姓名</h3>
               <h3>歌曲名称</h3>
               <h3>播放</h3>
               <h3>收藏</h3>
           </li>
           <li v-for="(item,index) in songs" :key="index">
             <h4 @click="gosinger(item)">{{item.auth}}</h4>
             <h4 >{{item.name}}</h4>
            <h4 @click="bofang(item)"><i :class="[$store.getters.getid==item.id?$store.getters.getplaybutton:'icon-bofang'+' '+'el-el-iconfont']"></i></h4>
             <h4 @click="collection(item)"><i class="el-icon-star-off"></i></h4>
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
        albumId:"",
        singerId:"",
        album:{},
        songs:[]
        }
    },
    components:{
     Foot
    },

    created(){
       this.albumId=this.$route.query.albumId;
       this.singerId=this.$route.query.singerId;
       console.log(this.albumId);
       console.log(this.singerId);
       this.selectAlbumById();
       this.selectSongs();
    },
    methods:{
        collection(options){
            if(this.$store.getters.getToken!=null&&this.$store.getters.getToken!=""){
          var hide={
              songId:options.id,
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
               musicplay.musicplay(options.id,options.url,options.pic,options.auth,options.name,options.lynic);
               this.$store.commit("setlistofsongs",options);
               this.$store.commit("setsongindex",options.id)
           }
       },
        selectAlbumById(){
        this.$axios.get("api/album/albumSelectById?id="+this.albumId).then((res)=>{
            console.log(res.data.data);
            this.album=res.data.data;
        })
        },
        selectSongs(){
        this.$axios.get("api/song/all?albumId="+this.albumId+"&singerId="+this.singerId).then((res)=>{
            console.log(res.data.data)
            this.songs=res.data.data
        })

        },
            gosinger(options){
        console.log(options);
        this.$router.push({
            path:"/singerDetail",
            query:{
                id:options.singerId
            }
        })
    },
    gomusic(options){
        console.log(options),
        this.$router.push({
            path:"/song",
            query:{
                id:options.id
            }
        })
    }
    }
}
</script>

<style lang="scss" scoped>
.albumDetail{
    width:100%;
    height:auto;
    .title{
       width:100%;
       height:400px;
        background:url("../image/name.png") no-repeat;
        background-size:auto;
        background-position: 0px -500px;
    }
    .center{
        width:1200px;
        height:auto;
        padding-bottom: 200px;
        padding-top:100px;
        margin:auto;
        position:relative;
        .title-center{
            background:#FEDCC1;
            position:absolute;
            width:100%;
            height:250px;
            top:-200px;
            border-radius:10px 10px 10px 10px;
        .left{
            float:left;
            width:200px;
            height:250px;
            overflow: hidden;
            margin-left:20px;
            position:relative;
            img{
                display: block;
                width:150px;
                height:auto;
                position:absolute;
                top:0;
                right:0;
                bottom:0;
                left:0;
                margin:auto;
            }

        }
        .right{
            width:800px;
            height:250px;
            float:left;
         h3{
             margin-top:50px;
             text-align: left;
             line-height: 40px;
         }
         p{
             font-size:14px;
             text-align: left;
         }
        }
        }
        ul{
            width:1200px;
            height:500px;
            display: flex;
          flex-direction:column;
            li:nth-of-type(1){
             width:100%;
             height:90px;
             border-bottom:2px solid #000;
             h3{
                 width:200px;
                 line-height:90px;
                 float:left;
                 text-align: center;
             }
            }
            li{
                list-style: none;
                height:70px;
                border-bottom: 1px solid #000;
                h4{
                    text-align: center;
                    width:200px;
                    line-height:70px;
                    float:left;
                i{
                    font-size:20px;
                }
                }
            }
        }
    }
}
</style>