<template>
  <div class="play">
    <div class="center">
      <!-- 1 -->
      <div class="item">
        <P @click="topmusic"><i class="icon-ziyuan1 el-iconfont"></i></P>
        <P @click="toggle"><i :class="getplaybutton"></i></P>
        <P @click="bottommusic"><i class="icon-ziyuan  el-iconfont"></i></P>
      </div>
      <div class='item' @click="gomusic()"><img :src="getpicurl"></div>
      <div class="item">
        {{onetime}}
      </div>
      <div class="item"     ref="progress"  @mousemove="move">
        <div class="musicmessage" >
          <div class="left">{{gettitle}}</div>
          <div class="right">{{getartist}}</div>
        </div>
        <!--  @click="updatemove" -->
        <div class="body"   ref="progress" @click="updatemove">
          <div class="dian" ref="curwidth"  :style="{width:curlength+'%'}" ></div>
          <div class='dian' ref="idot" :style="{left:curlength+'%'}"  @mousedown="down"  @mouseup="up"></div>
        </div>
        
      </div>
      <div class="item">{{twotime}}</div>
     
      <div class="item"  ref="laba" >
          <div class="laba" ref="labaheight"  v-show="laba" @click="audio">
           <div class="dian" ref="dianheight" :style="{height:getvolume*100+'px'}"></div>
         </div>
          <div class="laba"  @click="dianlaba"><i class="icon-yangshengqi el-iconfont"></i></div>
        </div>
      <div class="item" ><i class="icon-shoucang el-iconfont"></i></div>
      <div class="item"><i class="icon-yunduanxiazai el-iconfont"></i></div>
      <div class="item" @click="liebiao"><i class="icon-liebiao el-iconfont"></i></div>
    </div>
    {{this.volume}}
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import musicplay from "../utils/musicplay"
export default {
  data(){
    return {
       onetime:"00:00",
       twotime:"00:00",
       laba:false,
       curlength:0 ,//进度条的位置
       progresslength:0,//进度条的总长度
       start:0,//拖拽开始位置
       tag:false ,//当开始拖拽，会变成true，其他任何时间变为false;
       volume:10,//音量50
       volumheight:0,
       startHight:0,
    }
  },
  mounted(){
     this.progresslength=this.$refs.progress.getBoundingClientRect().width; //获取拖拽开始的位置
     this.volumheight=this.$refs.labaheight.getBoundingClientRect().height;
  },
   computed:{
  ...mapGetters([
    "getisplay",//状态
    "getid",
    "geturl",//路径
    'getplaybutton',
    "getpicurl",
    "getartist",
    "gettitle",
    "getduration",
    "getcurtime",
    "getvolume",
    "getsongindex",
  ])
  },
  watch:{
    getcurtime(){
      this.onetime=musicplay.formate(this.getcurtime);
      this.twotime=musicplay.formate(this.getduration);
    
      if(this.curlength==100){
        this.curlength=100,
        this.onetime=musicplay.formate(this.getduration)
        this.$store.commit("setisplay",false)
      }else{
      this.curlength=Math.floor((this.getcurtime/this.getduration)*100)
      }
    }
  },
 
  created(){
      
  },
  methods:{
    topmusic(){
     let list=JSON.parse(window.sessionStorage.getItem("listofsongs"));
         if(this.getsongindex==0){
            var options=list[list.length-1];
             musicplay.musicplay(options.id,options.url,options.pic,options.auth,options.name,options.lynic);
             this.$store.commit("setsongindex",options.id)
        }else{
             var options=list[this.getsongindex-1]
             musicplay.musicplay(options.id,options.url,options.pic,options.auth,options.name,options.lynic);
             this.$store.commit("setsongindex",options.id)
        }
       
      
    },
    bottommusic(){
        let list=JSON.parse(window.sessionStorage.getItem("listofsongs"));
         if(this.getsongindex==list.length-1){
            var options=list[0];
             musicplay.musicplay(options.id,options.url,options.pic,options.auth,options.name,options.lynic);
             this.$store.commit("setsongindex",options.id)
        }else{
             var options=list[this.getsongindex+1]
             musicplay.musicplay(options.id,options.url,options.pic,options.auth,options.name,options.lynic);
             this.$store.commit("setsongindex",options.id)
        }
    },
    liebiao(){
      console.log("sc")
      this.$store.commit("setsinglistisshow","")
    },
   audio(e){
           let height=e.clientY+e.currentTarget.offsetTop-600;
           let sc=this.volumheight-height;
           if(sc>80){
             sc=100
           }else if(sc<10){
             sc=0;
           }
           sc=sc*0.01
           this.$store.commit("setvolume",sc);
   },
    // 点击播放条，切换播放进度
    updatemove(e){
       if(!this.tag){
        //  进度条的左侧坐标
        let left=this.$refs.curwidth.getBoundingClientRect().left;
        // 
        var sc=((e.clientX-left)/this.progresslength)*100;

        if(sc>100){
          sc=100
        }else if(sc<0){
          sc=0
        }
        this.curlength=sc;
        musicplay.musicCurrent(sc);
       
       }
    },
    // 拖拽开始
   down(e){
     console.log(e)
     this.start=e.clientX;
     this.tag=true;
   },
   
  //拖拽中
   move(e){
    if(!this.geturl){
      return false;
    }
    if(this.tag){
     var left=e.clientX - this.start;
     var all=this.$refs.curwidth.getBoundingClientRect().width;
     var length=((left+all)/this.progresslength)*100;
     if(length>=100){
       this.curlength=100;
     }else{
   this.curlength=length;
     }
      
       this.start=e.clientX; 
      musicplay.musicCurrent(length)

    }
   },
   up(){
    this.tag=false;
    console.log("up")
   },
 
    dianlaba(){
      this.laba=!this.laba
    },
    toggle(){
      if(this.getisplay){
        this.$store.commit("setisplay",false);
        this.$store.commit("setplaybutton","icon-bofang"+' '+'el-el-iconfont')
      }else{
        this.$store.commit("setisplay",true);
        this.$store.commit("setplaybutton","icon-zanting"+" "+" el-iconfont")
      }
    },
    gomusic(){
      this.$router.push({
        path:"/song",
        query:{
          id:this.$store.getters.getid
        }
      })
    }

  }

}
</script>

<style lang="scss" acoped>
.play{
    width:100%;
    height:100px;
    position:fixed;
    bottom:0;
    z-index:1000;
    background:#fff;
    box-shadow: 10px 10px 10px 20px #8888;
    .center{
      width:1200px;
      height:100%;
      margin:auto;
      display: flex;
      align-items: center;
      justify-content:center;
      .item{
        width:100px;
        height:100px;
        text-align: center;
        line-height:100px;
      }
      .item:nth-child(1){
        width:200px;
        height:100px;
         display: flex;
          align-items: center;
           justify-content: space-between;
        p{
          width:70px;
          line-height: 70px;
          height:70px;
          text-align: center;
          border-radius:50%;
          box-sizing: border-box;
         
          i{
            font-size:20px;
          }
        }
      }
      .item:nth-child(2){
        text-align: center;
        line-height: 100px;
      display: flex;
  justify-content: center;
  align-items: center; 
        img{
          display: block;
          width:60%;
          height:auto;
          border-radius:10px;
        }
      }
      .item:nth-child(4){
        width:400px;
        height:100px;

        .musicmessage{
          position:absolute;
          top:10px;
          width:350px;
          height:30px;
          line-height:30px;
          font-size:14px;
          .left{
            float:left;
            font-weight: 600;
          }
          .right{
            float:right;
          }
        }
      .body{
          width:400px;
          height:5px;
          background:#8888;
          position:relative;

          top:50px;
          .dian{
            position:absolute;
          }
        .dian:nth-child(1){
       background:#409EFF;
       height:5px;
        }
        .dian:nth-child(2){
          position:absolute;
          width:15px;
          height:15px;
          top:-5px;
          border-radius: 50%;
          background:#000;
        }
      }
      }
      .item:nth-child(6){
        position: relative;
        .lab{
          position:absolute;

        }
        .laba:nth-child(1){
          position:absolute;
          top:-110px;
          right:0;
          margin:0 auto;
          left:0;
          width:5px;
          height:100px;
          background:#8888;
          border-radius:5px 5px 5px 5px;
           overflow: hidden;
          .dian{
            width:100%;    
            position:absolute;
            
          }
          .dian:nth-child(1){
             background: #409EFF;
             transform: rotate(-180deg);
             bottom:0px;
         }
        }
      }
    }
}
</style>