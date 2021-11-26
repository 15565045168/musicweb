<template>
  <div class="singer">
    <div class="title"></div>
    <div class="center">
    <h4 v-for="(item,index) in list" @click="search(item)" :key="index" :class="action==item.id?'active':''">{{item.name}}</h4>
    </div>
    <div class="singerall">
      <div class="everybody" v-for="(item,index) in singerAll" :key="index" @click="gosingerdetail(item.id)">
        <img :src="item.pic"/>
        <h5>{{item.name}}</h5>
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
  list:[
    {
      id:2,
      name:"全部"
    },
    {
      id:1,
      name:"男歌手"
    },
    {
      id:0,
      name:'女歌手'
    }
  ],
 
  action:2,
  singerAll:[]
}
  },
   components:{
  Foot
  },
  created(){
    this.all();
  },
  methods:{
    all(){
      this.$axios.get("api/singer/singerAll").then((res)=>{
        console.log(res.data.data);
        this.singerAll=res.data.data;
        console.log(this.singerAll)
      })
    },
    search(options){
      console.log(options)
      if(options.id==2){
        this.action=options.id;
        this.all();
      }else{
         this.action=options.id;
          this.$axios.get("/api/singer/selectSex?sex="+options.id).then((res)=>{
        this.singerAll=res.data.data;
        })
      }
    },
    gosingerdetail(options){
      console.log(options),
      this.$router.push({
        path:"/singerDetail",
        query:{
          id:options
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.active{
  color:#409EFF;
}
.singer{
  width:100%;
  height:auto;
  .title{
    width:100%;
    height:400px;
    background:url("../image/singer.jpg") no-repeat;
    background-size:100%;
    background-position:0 -400px;
  }
  .center{
    width:1200px;
    height:70px;
    margin:auto;
    margin-top:-70px;
    border-radius:10px 10px 0 0;
    background:#FEDCC1;
    h4{
      width:150px;
      height:70px;
      line-height:70px;
      float:left;
    }
  }
  .singerall{
    width:1200px;
    min-height:auto;
    margin:auto;
    margin-top:20px;
    overflow: hidden;
  .everybody{
    float:left;
    width:220px;
    height:250px;
    img{
      width:150px;
      height:200px;
      display: block;
      margin:auto;
    }
    h5{
      width:200px;
      line-height:50px;
      text-align: center;
      margin:auto;
    }
  }
  }
}
</style>