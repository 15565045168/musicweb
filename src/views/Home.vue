<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner">
      <div class="banner-center">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in list"
              :key="index"
              @click="gosinger(item)"
            >
                <img :src="item.pic" />
               <h6>{{item.name}}</h6>
          
            </div>
          </div>
          <div
            class="swiper-pagination swiper-pagination-white"
            id="swiper-spit"
          ></div>
        </div>
      </div>
    </div>
    <!-- 歌单 -->
   <div class="singerlist">
       <h2>歌单</h2>
       <ul class="singerlist-center">
          <li v-for="(item,index) in singerlist" :key="index">
           <img :src="item.pic">
           <p>{{item.title}}</p>
          </li>
         
       </ul>
     <div ></div>
   </div>
  
<!-- 歌手 -->
     <div class="singer">
       <h2>歌手</h2>
       <ul class="singer-center">
          <li v-for="(item,index) in singer" :key="index">
           <img :src="item.pic">
           <p>{{item.title}}</p>
          </li>
         
       </ul>

   </div>


  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min.js";
export default {
  data() {
    return {
      list: [],
      singerlist:[],
      singer:[]
    };
  },

  created() {
    this.bannerlist();
    this.singerlistdata();
    this.singerdata();
  },
  methods: {
    singerdata(){
     this.$axios.get("api/singer/singerAll").then((res)=>{
       console.log(res);
       this.singer=res.data.data.slice(0,10);
     })
    },
    singerlistdata(){
     this.$axios.get("api/songList/selectAll").then((res)=>{
       this.singerlist=res.data.data.slice(0,10);
     })
  },
  bannerlist(){
  this.$axios.get("api/singer/singerAll").then((res) => {
      this.list = res.data.data.slice(0,10);
      setTimeout(()=>{
           this.swiper()
      },10)
    });
} ,
   swiper() {
      var swiper = new Swiper(".swiper-container", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay （没有加入之前轮播图设置 autoplay：true无效）
          delay: 2000, // 自动切换的时间间隔（单位ms）
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    },
    gosinger(options){

    }
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;
  .banner {
    width: 100%;
    height: 450px;
    background: #e7ecf2;
    margin-top: 5px;
    .banner-center {
      width: 1200px;
      margin: auto;
      height: 100%;
      .swiper-container {
        width: 1200px;
        height: 100%;
        padding:20px;
      }
      .swiper-slide {
        position:relative;
        width:400px;
        height: 90%;
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        transition: 300ms;
        transform: scale(0.8);
        
        img{
          width: 450px;
          height: 100%;
        }
        h6{
          position:absolute;
          bottom:0;
          line-height:50px;
          background:#000;
          opacity: 0.4;
          width:100% !important;
          font-size:20px;
          color:#e7ecf2;
          left:0;
        }
      }
      .swiper-slide-active,
      .swiper-slide-duplicate-active {
        transform: scale(1);
      }
    }
  }
  .singerlist{
    width:100%;
    height:650px;
    h2{
      width:100%;
      font-size:25px;
      text-align: center;
       line-height:100px;
    }
    .singerlist-center{
      width:1200px;
      height:auto;
      margin:auto;
      li{
        width:220px;
        height:250px;
        float:left;
        margin:5px;
        list-style: none;
        box-sizing: border-box;
        
        overflow: hidden;
        img{
          width:220px;
          height:220px;
          display: block;
          border-radius:10px 10px 10px 10px;
        }
        p{
          width:100%;
          line-height:40px;
          font-size:15px;
          text-align: center;

        }
      }
    }
  }
  .singer{
    width:100%;
    height:650px;
    h2{
      width:100%;
      font-size:25px;
      text-align: center;
       line-height:100px;
    }
    .singer-center{
      width:1200px;
      height:auto;
      margin:auto;
      li{
        width:220px;
        height:250px;
        float:left;
        margin:5px;
        list-style: none;
        box-sizing: border-box;
        
        overflow: hidden;
        img{
          width:220px;
          height:220px;
          display: block;
          border-radius:10px 10px 10px 10px;
        }
        p{
          width:100%;
          line-height:40px;
          font-size:15px;
          text-align: center;

        }
      }
    }
  }
}
</style>
