<template>
  <div class="audio">
    <audio ref="audio"
    :src="geturl"
    controls="controls"
    preload="true"
    @canplay="startplay"
    @ended="ended"
    @timeupdate="timeupdate"
    ></audio>
 
  </div>
</template>

<script>
import {mapGetters,mapState} from "vuex"
export default {
   data(){
       return {

       }
   },
   computed:{
       ...mapGetters(["getid",
       "geturl", // 歌曲的url
       "getisplay", //播放状态
       'getlistofsongs',// 当前歌曲列表
      'getcurtime',//当前音乐的播放位置
    'getchangetime',//指定播放时刻
    'getautonext',//用于自动触发播放下一首，
    'getvolume' //音量 
       ])
   },
   watch:{
       //监听播放暂停播放
       getisplay:function(){
           this.toggleplay();
       },
       //跳转指定播放时刻
       getchangetime:function(){
           this.$refs.audio.currentTime=this.getchangetime
       },
       //改变音量
       getvolume(val){ 
        this.$refs.audio.volume=val;
       }
   },
   mounted(){
         this.$nextTick(() => {
          // 在此处执行你要执行的函数 
           this.startplay();
      });
   
   },
   methods:{
        startplay(){
              let music=this.$refs.audio;
              if(this.getisplay){
                music.play();
               this.$store.commit("setduration",music.duration);
               this.$store.commit("setisplay",true);
               this.$store.commit("setplaybutton",'icon-zanting'+' '+'el-iconfont')
              }else{
            this.$store.commit("setisplay",false);
            this.$store.commit("setplaybutton","icon-bofang"+' '+'el-el-iconfont')
              }
              
        
         
           
           
       },
       ended(){
           this.$store.commit("setisplay",false);
           this.$store.commit("setplaybutton","icon-bofang"+' '+'el-el-iconfont')
           this.$store.commit("setcurtime",0);
           this.$store.commit("setautonext",!this.getautonext);
       },
       toggleplay(){
           let audio=this.$refs.audio;
           if(this.getisplay){
               audio.play();
           }else{
               audio.pause();
           }
        
       },
    //    音乐播放时记录音乐的播放位置放到缓存中去
       timeupdate(){
           this.$store.commit("setcurtime",this.$refs.audio.currentTime)
       }
   }

}
</script>

<style lang="scss" scoped>
.audio{
   display: none;
}
</style>