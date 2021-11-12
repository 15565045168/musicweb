<template>
  <div id="app">
     <Title/>
    <router-view/>
  </div>
</template>
<script>
import Title from "./components/title.vue"
export default {
   components:{
     Title
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
