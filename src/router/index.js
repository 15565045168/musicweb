import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SongList from "../views/songlist.vue"
import Singer from "../views/singer.vue"
import MyMusic from "../views/mymusic.vue"
import Search from "../views/search.vue"
import Login from "../views/login.vue"
import Register from "../views/register.vue"
import Tellme from "../components/tellme.vue"
import Me from "../components/me.vue"
import SingerDetil from "../views/singerDetail.vue"
import SingerListDetail from "../views/singerListDetail.vue"
import AlbumDetail from "../views/albumDeatil.vue"
import Song from "../views/song.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
   path:"/songlist",
   name:"SongList",
   component: SongList
  },
  {
  path:"/singer",
  name: "Singer",
  component: Singer
  },
  {
    path:"/mymusic",
    name: "MyMusic",
    component: MyMusic
  },
  {
    path:"/search",
    name: Search,
    component: Search
  },
  {
    path:"/login",
    name:"Login",
    component: Login
  },
  {
    path:"/register",
    name: "Register",
    component: Register
  },
  {
    path:"/tellme",
    name:"Tellme",
    component:Tellme
  },
  {
    path:"/me",
    name:"Me",
    component:Me
  },
  {
    path:"/singerDetail",
    name:"SingerDetil",
    component:SingerDetil
  },
  {
    path:"/singerListDetail",
    name:SingerListDetail,
    component:SingerListDetail
  },{
    path:"/albumDetail",
    name:AlbumDetail,
    component:AlbumDetail
  },
  {
    path:"/song",
    name:Song,
    component:Song
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
