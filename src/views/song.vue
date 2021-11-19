<template>
<div class="song">
  <div class="song-center">
    <div class="center">
        <div class="left">
            <img :src="obj.pic"/>
            <h3>{{obj.name}}</h3>
            <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{obj.auth}}</h5>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;{{obj.introduction}}</p>
            <ul>
               <li><i class="icon-ziyuan1 el-iconfont"></i></li>
               <li><i class="icon-bofang el-iconfont"></i></li>
               <li><i class="icon-ziyuan  el-iconfont"></i></li>
            </ul>
        </div>
        <div class="right">
            <div class="box" v-html="obj.lynic">
            </div>
        </div>
    </div>
    
  </div>
  <Foot/>
</div>
</template>

<script>
import Foot from "../components/foot.vue"
export default {
    data(){
        return {
         songId:'',
         obj:{}
        }
    },
    components:{
         Foot
    },
    created(){
      
       this.songId=this.$route.query.id,
       this.new();
    },
    methods:{
    new(){
        this.$axios.get("api//song/selectById?id="+this.songId).then((res)=>{
           var lynic=res.data.data.lynic
    
            var cc=""
            for(var i=0;i<lynic.length;i++){
                if(lynic[i]=="["){
                     cc+="</br>"+lynic.charAt(i)
                }else{
                    cc+=lynic.charAt(i)
                }               
            }
            this.obj=res.data.data;
            this.obj.lynic= JSON.parse(JSON.stringify(cc));
            console.log(this.obj)
        })
    }
    }


}
</script>

<style lang="scss" scoped>
.song{
    width:100%;
    height: auto;
 .song-center{
     width:1200px;
     height:900px;
     margin:auto;
     .center{
         width:100%;
         height:850px;
         position:relative;
         div{
            position:absolute;
             height:100%;
             box-sizing: border-box;
         }
         .left{
             width:40%;
             left:0;
             top:20px;
             img{
                 width:60%;
                 height:auto;
                 margin:auto;
                 margin-top:30px;
                 border-radius:10px;
             }
             h3{
                 line-height:50px;
                 text-align: center;
             }
             h5{
                 text-align: center;
                 line-height:30px;
             }
             p{ 
                 font-size:14px;
                 line-height:20px;
                 text-align: left;
                 padding:20px;
                 margin-bottom:50px;
                 width:100%;
                 height:60px;
                 overflow: hidden;
                  text-overflow: ellipsis;
                 display: -webkit-box;
                  -webkit-line-clamp: 4;
                  -webkit-box-orient: vertical;
             }
             ul{
                 width:350px;
                 height:80px;
                 margin:auto;
                 li{
                     list-style: none;
                     width:80px;
                     height:80px;
                     margin-left:20px;
                     float:left;
                     line-height:80px;
                     border-radius:50%;
                     border:1px solid #2C3E50;
                     text-align: center;
                     i{
                           font-size:30px;
                     }
                 }
                 
                 li:hover{
                     color:#409EFF;
                 }
             }
         }
         .right{
             width:60%;
             right:0;
             top:20px;
             .box{
              position:relative;
              width:70%;
              height:700px;
              top:20px;
              right:0;
              bottom:0;
              left: 0;
              margin:auto;
              text-align: center;
              line-height:25px;
              overflow-y:scroll;
              font-size:14px;
             }
         }
     }
 }
}
</style>