import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SongList from "../views/songlist.vue"
import Singer from "../views/singer.vue"
import MyMusic from "../views/mymusic.vue"
import Search from "../views/search.vue"
import Login from "../views/login.vue"
import Register from "../views/register.vue"
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
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
