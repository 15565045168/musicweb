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
   },
  //  解析歌词 
  jiexi:function(text){
      let line=text.split("\r\n"); //jiang歌词换行
      let zhengze=/\[\d*:\d*((\.|\:)\d*)*\]/g;//时间正则表达式
      let result=[];
      //对于歌词格式不争取的返回；
      if(!(/\[.+\]/.test(text))){
         return [[0,text]]
      }
      //去掉前面格式不正确的行
     while(!zhengze.test(line[0])){
       line=line.slice(1);
  }
 
  //遍历每一行，形成一个每行带着两个元素的数组，第一个元素是时间,一秒为，第二个元素是歌词
  for(let item of line){
    let time=item.match(zhengze);//存前面的时间段
    // 存后面的歌词
    let value =item.replace(zhengze,'');
    for(let subitem of time){
      let t=subitem.slice(1,-1).split(":"); //去除时间换算成数组
      if(value!=''){
        result.push([parseInt(t[0],10)*60+parseFloat(t[1]),value]) ;
      }
    }
   
  }
  // 按照第一个元素--时间--排序
  result.sort(function(a,b){
    return a[0]-b[0];
  })
  return result;
  },
  jx:function(lrc){
    var lyrics =lrc.split("\r\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
  }


}

export default play;