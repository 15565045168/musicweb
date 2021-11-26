import musicplay from "../utils/musicplay"
const  play={
    state:{
    isplay:false, //是否播放
    url:"",//音乐地址，
    id:"" , //音乐的id   ,
    listofsongs:[],// 当前歌曲列表
    playbutton:"icon-bofang",//播放状态图标
    duration:0,//音乐时长
    curtime:0,//当前音乐的播放位置
    changetime:0,//指定播放时刻
    title:"",//歌名，
    artist:'',//歌手名称
    picurl:'', //歌曲图片
    autonext:"",//用于自动触发播放下一首，
    lyric:"",//未处理的歌词数据，
    templist:{},//单个歌单信息
    listindex:null,//当前歌曲在歌单中的位置
    volume:50, //音量 ,
    singlistisshow:false,//是否显示歌单列表
    songindex:0,//当前播放歌曲在列表中的第几项
    isshow:false
},
    mutations:{
        // 设置song是否显示
        setIsShow(state){
         state.isshow=!state.isshow
        },
      
        //设置歌单列表的显示隐藏
        setsinglistisshow(state,hehe){
            state.singlistisshow=!state.singlistisshow
        },
        // 设置播放状态
       setisplay(state,isplay){
           state.isplay=isplay
        //   window.sessionStorage.setItem("isplay",JSON.stringify(isplay))
       },
    //    设置音乐的路径
       seturl(state,url){
           state.url=url,
           window.sessionStorage.setItem("url",JSON.stringify(url))
       },
    //    设置音乐的id
       setid(state,id){
           state.id=id,
           window.sessionStorage.setItem("id",JSON.stringify(id)) 
       },
    //    设置当前歌曲列表
    setlistofsongs(state,listofsongs){
     var sc=JSON.parse(window.sessionStorage.getItem("listofsongs"));
     if(sc){
        var hk=musicplay.searth(sc,listofsongs);
        if(!hk){
            state.listofsongs=sc.unshift(listofsongs);
            window.sessionStorage.setItem("listofsongs",JSON.stringify(sc));
        }
     }else{ 
         var hehe=[];
        state.listofsongs=hehe.push(listofsongs);
         window.sessionStorage.setItem("listofsongs",JSON.stringify(hehe));
     }
     
       
    },
    setplaybutton(state,playbutton){
        state.playbutton=playbutton,
        window.sessionStorage.setItem("playbutton",JSON.stringify(playbutton))
    },
    //音乐时长
    setduration(state,duration){
       state.duration=duration
       window.sessionStorage.setItem("duration",JSON.stringify(duration))
    },
    //当前音乐的播放位置
    setcurtime(state,curtime){
        state.curtime=curtime;
        window.sessionStorage.setItem("curtime",JSON.stringify(curtime))
    },
    //指定播放时刻
    setchangetime(state,changetime){
        state.changetime=changetime;
        window.sessionStorage.setItem("changetime",JSON.stringify(changetime))
    },
    //歌名，
    settitle(state,title){
        state.title=title;
        window.sessionStorage.setItem("title",JSON.stringify(title))
    },
    //歌手名称
    setartist(state,artist){
        state.artist=artist;
        window.sessionStorage.setItem("artist",JSON.stringify(artist))
    },
    //歌曲图片
    setpicurl(state,picurl){
        state.picurl=picurl;
        window.sessionStorage.setItem("picurl",JSON.stringify(picurl))
    },
    //用于自动触发播放下一首，
    setautonext(state,autonext){
        state.autonext=autonext;
        window.sessionStorage.setItem("autonext",JSON.stringify(autonext))
    },
    //未处理的歌词数据，
    setlyric(state,lyric){
        state.lyric=lyric;
        window.sessionStorage.setItem("lyric",JSON.stringify(lyric))
    },
    //单个歌单信息
    settemplist(state,templist){
        state.templist=templist;
        window.sessionStorage.setItem("templist",JSON.stringify(templist))
    },
  //当前歌曲在歌单中的位置
    setlistindex(state,listindex){
        state.listindex=listindex;
        window.sessionStorage.setItem("listindex",JSON.stringify(listindex))
    },
    //音量 
    setvolume(state,volume){
        state.volume=volume;
        window.sessionStorage.setItem("volume",JSON.stringify(volume))
    },
    // 删除播放列表中的音乐
    setsongs(state,id){

        let list=JSON.parse(window.sessionStorage.getItem("listofsongs"))
       for(var i=0;i<list.length;i++){
          if( list[i].id==id){
              list.splice(i,1);
          }
       }
       window.sessionStorage.setItem("listofsongs",JSON.stringify(list));
       state.listofsongs=list
    },

    setsongindex(state,id){
        let list=JSON.parse(window.sessionStorage.getItem("listofsongs"));
        for(var i=0;i<list.length;i++){
            if( list[i].id==id){
               state.songindex=i;
               window.sessionStorage.setItem("songindex",JSON.stringify(i))  
            }
         } 
         
    },
    
    },
    getters:{
        getIsShow(state){
           return state.isshow;
        },
        //获取setsinglistisshow是否应该显示
        getsinglistisshow(state){
            return state.singlistisshow
        },
        // 获取状态
       getisplay(state){
        let play=state.isplay;
        // if(!play){
        //     play=JSON.parse(window.sessionStorage.getItem("isplay")||false);
        // }
        return play;
       },
    //    获取url
       geturl(state){
          var url= state.url;
          if(!url){
            url=JSON.parse(window.sessionStorage.getItem("url")||null);
          }
          return url;
       },
    //    获取id
       getid(state){
        let id=state.id;
        if(!id){
            id=JSON.parse(window.sessionStorage.getItem("id")||null);
        }
        return id;
       },
       //获取歌曲列表
       getlistofsongs(state){
        let listofsongs=state.listofsongs;
        if(!listofsongs.length){
            listofsongs=JSON.parse(window.sessionStorage.getItem("listofsongs")||null);
        }
        return listofsongs;
       },
       //播放状态图标
       getplaybutton(state){
           let playbutton=state.playbutton;
           if(!playbutton){
            playbutton=JSON.parse(sessionStorage.getItem("playbutton")||null);

           }
           return playbutton;
       },
       //音乐时长
       getduration(state){
        let duration=state.duration;
        if(!duration){
            duration=JSON.parse(sessionStorage.getItem("duration")||null);

        }
        return duration ;
    },
      //当前音乐的播放位置
       getcurtime(state){
        let curtime=state.curtime;
        if(!curtime){
            curtime=JSON.parse(sessionStorage.getItem("curtime")||null);

        }
        return curtime;
    },
     //指定播放时刻
       getchangetime(state){
        let changetime=state.changetime;
        if(!changetime){
            changetime=JSON.parse(sessionStorage.getItem("changetime")||null);

        }
        return changetime;
    },
       //歌名，
       gettitle(state){
        let title=state.title;
        if(!title){
            title=JSON.parse(sessionStorage.getItem("title")||null);

        }
        return title;
    },
       //歌手名称
       getartist(state){
        let artist=state.artist;
        if(!artist){
            artist=JSON.parse(sessionStorage.getItem("artist")||null);

        }
        return artist ;
    },
        //歌曲图片
       getpicurl(state){
        let picurl=state.picurl;
        if(!picurl){
            picurl=JSON.parse(sessionStorage.getItem("picurl")||null);

        }
        return picurl;
    },
       //用于自动触发播放下一首，
       getautonext(state){
        let autonext=state.autonext;
        if(!autonext){
            autonext=JSON.parse(sessionStorage.getItem("autonext")||null);

        }
        return autonext;
    },
      //未处理的歌词数据，
       getlyric(state){
        let lyric=state.lyric;
        if(!lyric){
            lyric=JSON.parse(sessionStorage.getItem("lyric")||null);

        }
        return lyric;
    },
      //单个歌单信息
       gettemplist(state){
        let templist=state.templist;
        if(!templist){
            templist=JSON.parse(sessionStorage.getItem("templist")||null);

        }
        return ;
    },
       //当前歌曲在歌单中的位置
       getlistindex(state){
        let listindex=state.listindex;
        if(!listindex){
            listindex=JSON.parse(sessionStorage.getItem("listindex")||null);

        }
        return listindex;
    },
      //音量 
       getvolume(state){
        let volume=state.volume;
        if(!volume){
            volume=JSON.parse(sessionStorage.getItem("volume")||null);

        }
        return volume;
    },
 //获取音乐在列表中的位置
 getsongindex(state){
     let songindex=state.songindex
     if(!songindex){
        songindex=JSON.parse(sessionStorage.getItem("songindex")||null);
     }
     return songindex;
 }
    }
    
}

export default play