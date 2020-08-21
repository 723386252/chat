<template>
  <div class="login">
    <el-row :gutter="0" class="rowstyle">
      <!-- <el-col :xs="0" :sm="5" :lg="5" :xl="5"><div> </div></el-col> -->
      <el-col :xs="{span:24,offset:0}" :sm="{span:14,offset:5}" style="height:100%">
        <div class="loginbox">
          <div class="icon"></div>
          <div class="inputarea">
            <div
              class="loginarea"
              :style="{visibility:loginshow,top:logintop + 'px',opacity:loginopacity,zIndex:loginz}"
            >
              <div class="title">login</div>
              <input type="text" class="input" name="loginid" style="top:250px" placeholder="请输入账号" v-model="loginid"/>
              <input
                type="password"
                class="input"
                name="password"
                style="top:350px"
                placeholder="请输入密码"
                v-model="loginpsw"
              />
            </div>
            <div
              class="registerarea"
              :style="{visibility:registershow,top:registertop + 'px',opacity:registeropacity,zIndex:registerz}"
            >
              <div class="title" style="top:50px">register</div>
              <div
                :style="{visibility:inner1,top:inner1top+'px',opacity:inner1opacity,transition:'1s all'}"
                class="innerpart1"
              >
                <input
                  type="text"
                  class="input"
                  name="registerid"
                  style="top:200px"
                  placeholder="请输入账号"
                  v-model='registerid'
                />
                <input
                  type="text"
                  class="input"
                  name="registername"
                  style="top:300px"
                  placeholder="请输入昵称"
                  v-model='registername'
                />
                <input
                  type="password"
                  class="input"
                  name="registerpsw"
                  style="top:400px"
                  placeholder="请输入密码"
                  v-model='registerpsw'
                />
                <div class="sexinput">
                  <span style="display:block;margin-left:10%;float:left">男</span>
                  <input type="radio" name="sex" value="1" class="sexitem" style="margin-left:5%" v-model="registersex"/>
                  <span style="display:block;margin-left:10%;float:left">女</span>
                  <input type="radio" name="sex" value="0" class="sexitem" style="margin-left:5%" v-model="registersex"/>
                </div>
              </div>
              <div
                :style="{visibility:inner2,top:inner2top+'px',opacity:inner2opacity,transition:'1s all'}"
                class="innerpart2"
              >
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:3000/submitportrait"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  name='portrait'
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div class="submitlogin" :style="{top:btntop+'px'}" @click="btnclick"></div>
            <span class="tiptext" @click="changemode">{{this.tiptext}}</span>
          </div>
        </div>
      </el-col>
      <!-- <el-col :xs="0" :sm="5" :lg="5" :xl="5"><div> </div></el-col> -->
    </el-row>
  </div>
</template>

<script>
import {submitregister,submitlogin} from '../network/api/login'
import {setToken} from '../utils/token'

export default {
  data() {
    return {
      btntop: 460,
      loginshow: "visible",
      registershow: "hidden",
      logintop: 0,
      registertop: 50,
      registeropacity: 0,
      loginopacity: 1,
      flag: true,
      tiptext: "没有账号？去注册",
      btnflag: false,
      inner1top: 0,
      inner1opacity: 1,
      inner1: "visible",
      inner2top: 50,
      inner2opacity: 0,
      inner2: "hidden",
      imageUrl: '',
      loginid:'',
      loginpsw:'',
      registersex:'',
      registerid:'',
      registername:'',
      registerpsw:'',
      portrait:'',
      loginz:5,
      registerz:0
    };
  },
  methods: {
    goregister(){
        this.tiptext = '已有账号？去登陆'
        this.flag = false;
        this.logintop = 50;
        this.loginopacity = 0
          setTimeout(() => {
            this.loginshow = "hidden";
          }, 1000);
        this.registershow = "visible";
        this.registertop = 0;
        this.registeropacity = 1;
        this.btntop = 520;
        this.loginid=''
         this.loginpsw=''
         this.loginz = 0
         this.registerz = 5
    },
    gologin(){
        this.flag = true;
        this.btnflag = false
        this.registertop = 50;
        this.registeropacity = 0;
        setTimeout(() => {
          this.registershow = "hidden";
        }, 1000);
        this.loginshow = "visible";
        this.logintop = 0;
        this.loginopacity = 1;
        this.btntop = 460;
        this.tiptext = "没有账号？去注册";
        this.inner1top = 0
          this.inner1opacity = 1
          this.inner1 = "visible"
          this.inner2top = 50
          this.inner2opacity = 0
          this.inner2 = "hidden"
          this.registersex=''
      this.registerid=''
      this.registername=''
      this.registerpsw=''
      this.portrait=''
      this.imageUrl = ''
      this.registerz = 0
      this.loginz = 5
    },
    changemode() {
      if (this.flag) {
        this.goregister()
        
      } else {
        this.gologin()
      }
    },
    login(){
submitlogin({
          userid:this.loginid,
          password:this.loginpsw
        }).then(res=>{
          if(res.success == 1){
                      setToken(res.data.token)
          this.$router.replace('/index')
          }
          else{
            console.log('用户名或密码错误');
          }

          
        })
    },
    register(){
submitregister({
              sex:this.registersex,
              userid:this.registerid,
              username:this.registername,
              password:this.registerpsw,
              portrait:this.portrait
          }).then(res=>{
            if(res.success == 0){
              this.goregister()
              alert('注册失败')
            }
            else{
              this.gologin()
              alert('注册成功')
            }
          })
    },
    btnclick() {
      if (this.flag) {
        this.login()
      } else {
        if (!this.btnflag) {
          this.btnflag = true
          this.inner1top = 50;
          this.inner1opacity = 0;
          setTimeout(() => {
            this.inner1 = "hidden";
          }, 1000);
          this.inner2 = "visible";
          this.inner2top = 0;
          this.inner2opacity = 1;
        }
        else{
          this.register()
        }
      }
    },
    handleAvatarSuccess(res, file) {
      this.portrait = res.portrait
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type.indexOf('image') === 0;
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('请上传图片');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  created(){
document.onkeydown =  event=> {
  if(event.keyCode == 13){
    this.btnclick()
  }
  }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  height: 100%;
  background-color: #f6f6f6;
}
.rowstyle {
  position: relative;
  height: 100%;
  max-height: 700px;
  position: relative;
  top: 100px;
}
.loginbox {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
}
.icon {
  position: relative;
  width: 60%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 3px 0 10px -10px;
  float: left;
}
.inputarea {
  position: relative;
  width: 40%;
  height: 100%;
  float: left;
}
.loginarea {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 1s;
}
.registerarea {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 1s;
}
.submitlogin {
  height: 60px;
  width: 60px;
  background-image: url("../assets/imgs/icon/login_button.png");
  background-size: 60px 60px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
  transition: all 1s;
  z-index: 10;
}
.submitlogin:hover {
  background-image: url("../assets/imgs/icon/login_button_focus.png");
}
.input {
  height: 40px;
  width: 70%;
  position: absolute;
  left: 15%;
  border: 0;
  outline: none;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  font-size: 18px;
}
.sexinput {
  position: relative;
  margin: 0 auto;
  top: 470px;
  margin-left: 20%;
}
.sexitem {
  height: 15px;
  width: 15px;
  position: relative;
  top: 5px;
  float: left;
}
.tiptext {
  width: 100%;
  cursor: pointer;
  display: block;
  font-size: 15px;
  position: absolute;
  text-align: center;
  line-height: 15px;
  top: 630px;
  color: rgba(100, 100, 100, 0.7);
  z-index: 10;
}
.tiptext:hover {
  color: rgba(70, 70, 70, 0.8);
}
.title {
  font-size: 60px;
  color: rgba(100, 100, 100, 0.5);
  margin: 0 auto;
  text-align: center;
  font-weight: 800;
  margin-top: 70px;
}
.innerpart1 {
  width: 100%;
  height: 100%;
  position: absolute;
}
.innerpart2 {
  width: 100%;
  height: 100%;
  position: absolute;
}
/deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }
.avatar-uploader{
    position: relative;
    text-align: center;
    top: 250px;
}
/deep/.el-upload:hover{
    /* border-color: #409EFF !important; */
    border: 1px dashed #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  @media screen and (max-width:800px){
    .title{
      font-size:50px
    }
  }
</style>