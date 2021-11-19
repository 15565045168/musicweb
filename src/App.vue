<template>
  <div id="app">
     <Title/>
     <Play/>
     <Audio/>
     <Singerlist/>
    <router-view/>
  </div>
</template>
<script>
import Play from "./components/play.vue"
import Title from "./components/title.vue"
import Audio from "./components/audio.vue"
import Singerlist from "./components/singerlist.vue"
export default {
   components:{
     Title,Play,Audio,Singerlist
   }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
