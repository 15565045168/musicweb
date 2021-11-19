import vuex from "../store/index"
const play={
    musicplay:function(id,url,picurl,artist,title,lyric){
      vuex.commit("setid",id);
      vuex.commit("seturl",url);
      vuex.commit("setpicurl",picurl); //歌手图片
      vuex.commit("setartist",artist); //歌手名
      vuex.commit("settitle",title); //音乐名称
      vuex.commit("setlyric",lyric);//歌词
    },
    formate:function(value){
      let time=parseInt(value);
      let result="";//返回值
      let hour =parseInt(time/3600); //小时
      let minute=parseInt((time/60)%60);//分钟
     let second=parseInt(time%60);//秒
     if(hour>0){
       if(hour<10){
         result="0"+hour+":"
       } else{
         result=hour+":"
       }
    }
    if(minute>0){
      if(minute<10){
        result+="0"+minute+":"
      }else{
        result+=minute+":"
      }
    }else{
      result+="00:"
    }
    if(second>0){
      if(second<10){
        result+="0"+second
      }else{
        result+=second
      }
    }else{
      result+="00"
    }
    return result;
    },
    // 更改歌曲进度：
   musicCurrent:function(time){
     console.log(time)
     let num=parseInt(time)*0.01
    let sum=Math.ceil(num*vuex.getters.getduration);
     vuex.commit("setchangetime",sum);
   },
  //  查重
   searth(lengths,item){
     for(var i=0;i<lengths.length;i++){
       if(lengths[i].id==item.id){
         return true;
       }
     }
     return false;
   }


}

export default play;