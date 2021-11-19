<template>
  <div class="singerlist" v-show="getsinglistisshow">
   <h2>播放列表</h2>
   <div class="list" v-for="(item,index) in getlistofsongs"  :key="index" :class="[getid==item.id?'one':'']">
       <p @click="gomusic(item)">{{item.name}}</p><p ><el-button type="danger" @click="clear(item.id)" icon="el-icon-delete" circle></el-button></p>
   </div>
   
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import musicplay from "../utils/musicplay"
export default {
    data(){
        return {

        }
    },
 computed:{
     ...mapGetters(["getlistofsongs","getsinglistisshow","getid"])
},
methods:{
    gomusic(options){
        if(options.id==this.$store.getters.getid){
             if(this.$store.state.play.isplay){
             this.$store.commit("setisplay",false);
             this.$store.commit("setplaybutton","icon-bofang"+' '+'el-el-iconfont');
             this.$store.commit("setlistofsongs",options);
             this.$store.commit("setsongindex",options.id)
             }else{
              this.$store.commit("setisplay",true);
              this.$store.commit("setplaybutton","icon-zanting"+' '+'el-el-iconfont')
             this.$store.commit("setlistofsongs",options);
             this.$store.commit("setsongindex",options.id)
            }
           }else{
               musicplay.musicplay(options.id,options.url,options.pic,options.auth,options.name,options.lynic);
               this.$store.commit("setlistofsongs",options);
               this.$store.commit("setsongindex",options.id)
           }
    },
    clear(id){
         this.$store.commit("setsongs",id);
    }
}
}
</script>

<style lang="scss" scoped>
.el-button.is-circle{
    padding:6px !important;
}
.one{
    color:#409EFF;
}
 .singerlist{
   width:300px;
   height:500px;
   position:fixed;
   right:0;
   bottom:100px;
   z-index:1000000;
   background:#E8E8E8;
   border-radius:20px 0 0 0;
   overflow-y: scroll;
   h2{
       width:100%;
       height:50px;
       text-align: center;
       line-height:50px;
       color:#409EFF;
   }
   .list{
       width:90%;
       line-height:40px;
       margin:auto;
       border-bottom:1px solid #8888;
       font-weight:600;
       display: flex;
         justify-content: center;
         justify-items: center;
         font-size:14px;
       p:nth-of-type(1){
           width:70%;
       }
       p:nth-of-type(2){
           width:30%;
       }
   };
 }
</style>