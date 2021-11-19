<template>
  <div class="foot">
      <div class="foot-center">
          <p @click="about">关于</p>
          <p></p>
          <p @click="me">联系我</p>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        me(){
            this.$router.push({
                path:"me"
            })
        },
        about(){
            this.$router.push({
                path:"tellme"
            }) 
        }
    }

}
</script>

<style lang="scss" scoped>
.foot{
    width:100%;
    height:120px;
    background:#ECECEC;
    padding-bottom: 150px;
    .foot-center{
        width:1200px;
        height:100%;
        margin:auto;
        display: flex;
           justify-content:center;
           align-items: center;
        p{
            width:100px;
            height:100%;
            line-height:150px;
            font-size:15px;
        }
    }

}

</style>