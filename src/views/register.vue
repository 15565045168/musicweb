<template>
  <div class="register">
    <h4>用户注册</h4>
      <div class='center'>
 <el-form ref="form" :model="consumer"  :rules="rules"  label-width="80px">
  <el-form-item label="账户名称"  prop="username">
    <el-input v-model.trim="consumer.username"></el-input>
  </el-form-item>
   <el-form-item label="账户密码" prop="password">
    <el-input type="password" v-model.trim="consumer.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="password2">
    <el-input type="password" v-model.trim="consumer.password2" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="性别" prop="sex">
    <el-radio-group v-model="consumer.sex">
      <el-radio label="男" ></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="手机号码" prop="phoneNum">
    <el-input  v-model.trim="consumer.phoneNum"></el-input>
  </el-form-item>
   <el-form-item label="电子邮件" prop="email">
    <el-input  v-model.trim="consumer.email"></el-input>
  </el-form-item>
  <el-form-item label="个性签名"  prop="introduction">
    <el-input  v-model.trim="consumer.introduction"
     type="textarea"
  placeholder="请输入内容"
  maxlength="200"
    ></el-input>
  </el-form-item>
  <el-form-item label="头像">
    <el-upload
  class="avatar-uploader"
  action="/api/consumerUpload/upload"
  :show-file-list="false"
  :on-success="success"
  :before-upload="befor">
  <img v-if="consumer.avator" :src="consumer.avator" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
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
    <el-button type="primary" @click="submitForm('form')">立即注册</el-button>
    <el-button @click="resetForm('form')">重新输入</el-button>
  </el-form-item>
  
 </el-form>
      </div>
    
  </div>
</template>

<script>
export default {
  created(){
      this.sc(); 
  },
  data(){
     var password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.rules.password2 !== '') {
            this.$refs.form.validateField('password2');
          }
          callback();
        }
      };
      var password2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.consumer.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var phoneNum=(rule, value, callback)=>{
        const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
           if (!value) {
    return callback(new Error('请填写手机号码！'))
  } else if (!reg.test(value)) {
    return callback(new Error('请填写正确的手机号码！'))
  }else{
    callback()
}};
var email=(rule, value, callback)=>{
     if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
}
    return {
      consumer:{
         username:"",
         password:"",
         password2:"",
         sex:"",
         phoneNum:'',
         email:"",
         introduction:"",
         avator:"",
         code:''
      },
      string:"",
    
       rules:{
        username:[
            { required: true, message: '请输入账户名称', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password:[
            {  required: true,validator: password, trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password2: [
            {  required: true,validator: password2, trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
          sex:[
              { required: true, message: '请选择您的性别', trigger: 'change' }
          ],
          phoneNum:[
            { required: true, validator:phoneNum, trigger: 'blur'}
          ],
          email:[
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {validator: email, trigger: 'blur'}

          ],
          introduction:[
            { min: 0, max: 200, message: '长度在 0 到 200个字符', trigger: 'blur' }
          ],
           code:[
            {required: true, message: '验证码不能为空', trigger: 'blur'}

          ]

      }

    }
  
      },
     methods: {
        success(res, file) {
         if(res.code==10000){
           console.log(res)
       this.consumer.avator= res.data.FilePathName;
        this.$notify({
          title: '消息提示',
          message: res.message,
          type: 'success'
        });
         }else{
  this.$notify.error({
          title: '错误',
          message: res.message
        });
         }
          
      
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           var consumer={
             username:this.consumer.username,
             password:this.consumer.password,
             sex:this.consumer.sex=='男'?1:0,
             phoneNum:this.consumer.phoneNum,
             email:this.consumer.email,
             introduction:this.consumer.introduction,
             avator:this.consumer.avator,
             code:this.consumer.code
           }
           console.log(consumer);
           this.$axios.post("api/consumer/add",consumer).then((res)=>{
            console.log(res);
            if(res.data.code==10000){
               this.$notify({
          title: '消息提示',
          message: res.data.data+"为您跳转到登录页",
          type: 'success'
        });
        setTimeout(()=>{
            this.$router.push({
           path:'login'
         })
        },1000)
            }else{
             this.$notify.error({
          title: '错误',
          message:res.data.data
        }); 
            }
           }).catch((error)=>{
             console.log(error)
           })
          } else {
             this.$message('请填写必要的信息');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       befor(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      sc(){
     this.string ="api/code/jpg?data="+new Date();
      },
      clickImg(){
        this.sc();
      }
    }
     
    
  
      

}
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-icon-plus{
    border:1px solid #888;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

.el-form-item__content:nth-of-type(9){
  margin-top:20px;
  display: flex;
  flex-direction:column;
 
}
.code{
  display: flex;
  justify-content:space-between;
  box-sizing: border-box;
  .el-input{
   width:50%;
   img{
     width:150px;
     height:40px;
    margin-left:50px;
   }
 }
}
.el-input{
  display: flex;
  justify-content: left;
}
  .register{
    width:100%;
    min-height:900px;
    h4{
      width:1200px;
      line-height:100px;
      margin:auto;
      height:100px;
      text-align:center;
      font-size:20px;
      position:absolute;
      left:0;
      right:0;

    }
    .center{
      width:400px;
      height:500px;
      position:absolute;
      top:-150px;
      right:0;
      bottom:0;
      left:0;
      margin:auto;
     
    }
  }
</style>