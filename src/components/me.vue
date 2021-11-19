<template>
  <div class="tellme">
    <div class="center">
         <h4>关于我</h4>
         <p>如涉及版权问题或其他违规问题请发邮件至1942571024@qq.com</p>
        </div>  
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .tellme{
     width:100%;
     background:url("../image/is.jpg") no-repeat;
     background-size:100% 100%;
     .center{
         width:1200px;
          margin:auto;
          height:80vh;
         h4{
             width: 100%;
             line-height:200px;
             font-size:30px;
             text-align: center;
             color:#fff;
         }
         p{
             width:100%;
             line-height: 30px;
             font-size: 20px;
             color:#fff;
         }
     }

 }
</style>