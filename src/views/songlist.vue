<template>
<div class="songlist">
  <div class="title">
    
  </div>
  <div class="option">
  <h4 v-for="(item,index) in options" :key="index" :class="isshow==item.id?'show':''"
   @click="select(item)">{{item.name}}</h4>
  </div>
  <ul class="body">
   <li v-for="(item,index) in songList" :key="index" @click="go(item.id)">
     <img :src="item.pic"/>
     <h5>{{item.title}}</h5>
     </li> 
  </ul>
<Foot/>
</div>  
</template>

<script>
import Foot from "../components/foot.vue"
export default {
  data(){
    return {
        songList:[],
        options:[
          {
            id:0,
            name:"全部"
          },
           {
            id:1,
            name:"华语"
          },
           {
            id:2,
            name:"英语"
          },
           {
            id:3,
            name:"经典"
          },
           {
            id:4,
            name:"小语种"
          },
           {
            id:5,
            name:"愉快"
          },
          {
            id:6,
            name:"激动"
          },
          {
            id:7,
            name:"伤感"
          }
        ],
        isshow:0
        
    }
  },
  components:{
  Foot
  },
  created(){
    this.alldata();
  },
  methods:{
     alldata(){
       this.$axios.get("api/songList/selectAll").then((res)=>{
         this.songList=res.data.data;
       })
     },
     select(options){
      if(options.id==0){
        this.isshow=0;
        this.alldata();
      }else{
         this.isshow=options.id;
       this.$axios.get("api/songList/style?style="+options.name).then((res)=>{
         this.songList=res.data.data;
       })
      }
     },
     go(options){
       console.log(options);
       this.$router.push({
         path:"/singerListDetail",
         query:{
           id:options
         }
       })
     }
  }

}
</script>

<style lang="scss" scoped>
.show{
  color:#409EFF;
  border-bottom: 2px solid #409EFF;
}
 .songlist{
   width:100%;
   height:auto;
   .title{
     width:100%;
     height:400px;
     background:url("../image/me.jpg") no-repeat;
     background-size:auto;
     background-position-y:-900px;
    
   }
   .option{
      width:1200px;
      height:70px;
      margin:auto;
      h4{
        width:120px;
        line-height:70px;
        float:left;
        text-align: center;
        font-size:18px;
      }
   }
   ul{
     width:1200px;
     min-height:600px;
     margin:auto;
     margin-top:20px;
     box-sizing: border-box;
     li{
       list-style: none;
       float:left;
       width:295px;
       height:295px;
       box-sizing: border-box;
       padding:10px;
       position:relative;
       img{
         display: block;
         margin:auto;
         width:200px;
         height:200px;
         border-radius: 10px;
       }
       h5{
         width:250px;
         margin:auto;
         height:50px;
         margin:auto;
         line-height:50px;
         overflow: hidden;
         text-align: center;
       }
     }
   }
 }
</style>
