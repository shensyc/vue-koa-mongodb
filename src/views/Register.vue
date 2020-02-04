<template>
    <div class="itc-register-wrap">
        <div class="register-area">
            <div class="register-logo">
                注册
            </div>
            <div class="register-form">
                <div class="register-form-header">
                    <div class="pd10 font-weight">register to our site</div>
                    <div class="pdb10">register to have a nice day</div>
                    <div class="upload-avatar">
                        <div class="upload-button">
                            <label for="upload-img" class="upload-img-btn">
                                <i class="el-icon-plus" style="color:#fff;"></i>
                            </label>
                            <input type="file" id="upload-img" @change="upload_img">
                        </div>
                        <el-avatar :src="registerForm.avatar" :size="70" shape="square" v-show="registerForm.avatar" style="margin-left:10px"></el-avatar>
                    </div>
                </div>
                <div class="register-form-body">
                    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px" class="form-container">
                        <el-form-item prop="user_name">
                            <el-input v-model="registerForm.user_name" placeholder="昵称" prefix-icon="el-icon-star-off" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item prop="user_id">
                            <el-input v-model="registerForm.user_id" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item prop="user_pwd">
                            <el-input v-model="registerForm.user_pwd" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="re_user_pwd">
                            <el-input v-model="registerForm.re_user_pwd" placeholder="确认密码" prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                         <el-form-item prop="code">
                            <el-input v-model="registerForm.code" placeholder="验证码" prefix-icon="el-icon-key" class="code_input"></el-input>
                            <div class="code">
                                <img :src="img_base64" alt="code" title="点击切换验证码" @click="changeCode">
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="button" class="w100" @click="submit('registerForm')" :loading="registerStatus">注册</el-button>
                            <p class="toLogin"><el-link type="info" @click="goLogin">已有账号，去登陆</el-link></p>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="cropper-img-box" v-if="cropper_box_mark==true">
            <VueCropper 
            ref="cropper" 
            :img="cropperData.img"
            :autoCrop="cropperData.autoCrop"
            :autoCropWidth="cropperData.autoCropWidth"
            :autoCropHeight="cropperData.autoCropHeight"
            :fixedBox="cropperData.fixedBox"
            ></VueCropper>
            <div class="cropper-img-tool">
                <el-button type="warning" icon="el-icon-refresh-left" circle size="medium" @click="rotateRight"></el-button>
                <el-button type="priminfoary" icon="el-icon-close" circle size="medium" @click="cropper_box_mark==false"></el-button>
                <el-button type="success" icon="el-icon-check" circle size="medium" @click="finish"></el-button>
                <el-button type="warning" icon="el-icon-refresh-right" circle size="medium" @click="rotateLeft"></el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
    export default {
        name:'register',
        components:{
            VueCropper
        },
        data(){
            const validateUserId = (rule,value,callback)=>{
                let reg = /^[a-zA-Z0-9_-]{6,10}$/
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else if (!reg.test(value)) {
                    callback(new Error('用户名长度应为6-10位、支持字母、数字、下划线、减号'))
                } else {
                    callback()
                }
            } 

            const validatePwd = (rule,value,callback)=>{
                let reg = /^[\w_-]{6,10}$/;
                if(value===''){
                    callback(new Error('请输入密码'));
                }else if(!reg.test(value)){
                    callback(new Error('密码长度应为6-10位、支持字母、数字、下划线、减号'));
                }else{
                    if(this.registerForm.re_user_pwd!==''){
                        this.$refs.registerForm.validateField('re_user_pwd')
                    }
                    callback();
                }
            }

            const validateRepwd = (rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请再次输入密码'));
                }else if(value!==this.registerForm.user_pwd){
                    callback(new Error('两次输入的密码不一致'));
                }else{
                    callback();
                }
            }

            return {
                registerForm:{
                    user_name:"",
                    user_id:'',
                    user_pwd:'',
                    re_user_pwd:'',
                    code:'',
                    code_token:'',
                    avatar:''
                },
                registerStatus:false,
                cropper_box_mark:false,
                cropperData:{
                    img:'',
                    autoCrop:true,
                    autoCropWidth:400,
                    autoCropHeight:400,
                    fixedBox:true
                },
                img_base64:'',
                registerRules:{
                    user_name:[
                        {required:true,message:'昵称',triggger:'blur'}
                    ],
                    user_id:[
                        {validator:validateUserId,triggger:'blur'}
                    ],
                    user_pwd:[
                        {validator:validatePwd,triggger:"blur"}
                    ],
                    re_user_pwd:[
                        {validator:validateRepwd,triggger:"blur"}
                    ],
                    code:[
                        {required:true,message:'请输入验证码',trigger:"blur"},
                        {len:4,message:'请输入4位有效的验证码',trigger:"blur"}
                    ]
                }
            }

        },
        created(){
            this.getCode();
        },
        methods:{
            goLogin(){
                this.$router.push({path:'/login'});
            },
            
        }

    }
</script>

<style  scoped>
    .itc-register-wrap{
        height: 100%;
        background: url('../assets/bg3_4.jpg');
        background-size: 100% 100%;
        position: relative;
    }
    .register-area{
        width: 555px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .register-logo {
    text-align: center;
    font-size: 25px;
    color: #000;
    font-family: cursive;
    font-weight: bold;
    padding: 20px 0;
  }
  .register-form {
    background: rgba(0,0,0,.3);
    padding: 0 20px;
  }
  .font-weight {
    font-size: 18px;
    font-weight: bold;
  }
  .pd10 {
    padding: 20px 0;
  }
  .pdb10 {
    padding-bottom: 10px;
  }
  .register-form-body {
    padding: 30px 0 10px 0;
  }
  .form-container .el-input {
    margin-bottom: 5px;
  }
  .w100 {
    width: 100%;
  }
  .register-form-header {
    position: relative;
  }
  .register-form-header .upload-avatar{
    position: absolute;
    top: 20px;
    right:0;
  }
  .upload-avatar .upload-button {
    display: inline-block;
  }
  .upload-avatar .upload-button .upload-img-btn{
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 70px;
    display: inline-block;
    width: 70px;
    line-height: 70px;
    text-align: center;
  }
  .upload-avatar .upload-button #upload-img{
    display: none;
    opacity: 0;
  }
  .form-container .el-form-item__content {
    margin-left: 0 !important;
    line-height: 20px !important;
  }
  .code_input {
    width: 400px;
  }
  .code {
    width: 100px;
    cursor: pointer;
    float: right;
  }
  .cropper-img-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .cropper-img-tool {
    position: absolute;
    z-index: 2;
    bottom: 50px;
    left: 0;
    text-align: center;
    width: 100%;
  }
  .toLogin {
    margin: 10px 0;
    text-align: center;
  }
  .toLogin .el-link--info{
    font-size: 12px;
    color: #fff;
  }

</style>