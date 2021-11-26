<template>
<div class="song">
  <div class="song-center">
    <div class="center">
        <div class="left">
            <img :src="obj.pic"/>
            <h3>{{obj.name}}</h3>
            <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{obj.auth}}</h5>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;{{obj.introduction}}</p>
        </div>
        <div class="right">
            <ul>
            <li v-for="(item,index) in result" :key="index">
                {{item[1]}}
            </li>
            </ul>
        </div>
    </div>
    
  </div>
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
         songId:'',
         obj:{},
         lynic:"",
         result:'',
        }
    },
    components:{
         Foot
    },
    computed:{
        ...mapGetters(["getid","getcurtime","getIsShow"])
    },
    created(){
     this.new(this.getid)
    },
    watch:{
       getid:function(options){
           this.new(options);
           
       },
         getcurtime:function(){
             if(this.result.length>0){
    
                 for(var i=0;i<this.result.length;i++){
                     if(this.getcurtime>=this.result[i][0]){
                         for(var j=0;j<this.result.length;j++){
                             document.querySelectorAll("ul li")[j].style.color="#000";
                             document.querySelectorAll("ul li")[j].style.fontSize="14px";
                         }
                         if(i>=0){
                              document.querySelectorAll("ul li")[i].style.color="#409EFF";
                             document.querySelectorAll("ul li")[i].style.fontSize="20px";
                         }
                     }
                 }
             }
         }
    },
    methods:{
    new(songId){
        this.$axios.get("api//song/selectById?id="+songId).then((res)=>{
            this.obj=res.data.data;
          
         
     this.result= musicplay.jiexi(res.data.data.lynic);
     
        })
    },
  
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
             width:50%;
             right:0;
             top:20px;
             ul{
                 width:100%;
                 height:700px;
                 overflow-y: auto;
                 li{
                     list-style:none;
                     line-height:30px;
                     text-align: center;
                     font-size:14px;
                 }
             }
         }
     }
 }
}
</style>