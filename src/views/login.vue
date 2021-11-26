<template>
  <div class="login">
     <div class="center">
     <h3>用户登录</h3>
      <el-form ref="form" :model="consumer"  :rules="rules"  label-width="80px">
   <el-form-item label="账户名称"  prop="username">
    <el-input type="text" v-model.trim="consumer.username"></el-input>
  </el-form-item>
   <el-form-item label="账户密码"  prop="password">
    <el-input type="password" v-model.trim="consumer.password"></el-input>
  </el-form-item>
   <el-form-item label="验证码"  prop="code">
    <div class="code">
    <el-input v-model.trim="consumer.code"></el-input>
    <div class='el-input'>
      <img :src="string" @click="clickImg">
    </div>
    </div>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="submitForm('form')">点击登录</el-button>
    <el-button @click="resetForm('form')">重新输入</el-button>
  </el-form-item>
      </el-form>
     </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      consumer:{
        username:"",
        password:"",
        code:""
      },
      string:"",
      rules:{
        username:[
            { required: true, message: '请输入账户名称', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
          password:[
            { required: true, message: '请输入有效密码', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        code:[
            {required: true, message: '验证码不能为空', trigger: 'blur'},
             { min: 4, max: 4, message: '验证码长度只能为4', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          this.$axios.get("/api/consumer/login?username="+this.consumer.username+"&password="+this.consumer.password+"&code="+this.consumer.code).then((res)=>{
            console.log(res);
            if(res.data.code==10000){
          this.$store.commit("setToken",res.data.data.token);
           this.$store.commit("setUserId",res.data.data.data.id);
          this.$store.commit("setUserAvator",res.data.data.data.avator);
          this.$store.commit("setUserEmail",res.data.data.data.email);
          this.$store.commit("setUserId",res.data.data.data.id);
          this.$store.commit("setUserIntroduction",res.data.data.data.introduction);
          this.$store.commit("setUserPhoneNum",res.data.data.data.phoneNum);
          this.$store.commit("setUsername",res.data.data.data.username);
           setTimeout(()=>{
       this.$notify({
          title: '消息提示',
          message: res.data.message+"为您跳转到主页",
          type: 'success'
        });
        this.$router.push({
          path:"/"
        })
           },500)
            }else if(res.data.code==10001){
             this.$notify.error({
          title: '错误',
          message:res.data.data
        }); 
            }
          }).catch((error)=>{

          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      code(){
         this.string ="api/code/jpg?data="+new Date();
      },
      clickImg(){
        this.code()
      }
  },
  created(){
    this.code();
  }

}
</script>

<style lang="scss" scoped>
 .login{
   width:100%;
    .center{
      width:400px;
      height:400px;
      position:absolute;
      top:0;
      right:0;
      left:0;
      bottom:0;
      margin:auto;
      h3{
        padding-bottom:30px;
        text-align: center;
      }
    }
 }
 .code{
  display: flex;
  justify-content:space-between;
  box-sizing: border-box;
  .el-input{
   width:50%;
   height:40px;
   img{
     width:100px;
     height:40px;
    margin-left:50px;
   }
 }
}
</style>