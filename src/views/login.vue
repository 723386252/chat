<template>
    <div class="login">
    <div class="row rowstyle">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
      <div class="loginbox">
          <div class="icon"></div>
          <div class="inputarea">
              <div class="loginarea" :style="{visibility:loginshow,top:logintop + 'px',opacity:loginopacity}">
              <input type="text" class="input" name="loginid" style="top:250px" placeholder="请输入账号">
              <input type="password" class="input" name="password" style="top:350px" placeholder="请输入密码">
              </div>
              <div class="registerarea" :style="{visibility:registershow,top:registertop + 'px',opacity:registeropacity}">
              <input type="text" class="input" name="loginid" style="top:200px" placeholder="请输入账号">
              <input type="text" class="input" name="username" style="top:300px">
              <input type="password" class="input" name="password" style="top:400px">
              <div class="sexinput">
              <span style="display:block;position:absolute;left:110px">男</span><input type="radio" name="sex" value="1" class="sexitem" style="left:130px">
              <span style="display:block;position:absolute;left:210px">女</span><input type="radio" name="sex" value="0" class="sexitem" style="left:230px">
              </div>
              </div>
              <div class="submitlogin" :style="{top:btntop+'px'}"></div>
              <span class="tiptext"  @click="changemode">{{this.tiptext}}</span>
          </div>
      </div>
  </div>
  <div class="col-sm-3"></div>
</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btntop:460,
            loginshow:'visible',
            registershow:'hidden',
            logintop:0,
            registertop:50,
            registeropacity:0,
            loginopacity:1,
            flag:true,
            tiptext:'没有账号？去注册'
        }
    },
    methods:{
        changemode(){
            if(this.flag){
                this.flag = false
                this.logintop = 50
                this.loginopacity = 0,
                setTimeout(() => {
                    this.loginshow = 'hidden'
                }, 1000);
                this.registershow = 'visible'
                this.registertop = 0
                this.registeropacity = 1
                this.btntop = 520
                this.tiptext = '已有账号？去登陆'
            }
            else{
                this.flag = true
                this.registertop = 50
                this.registeropacity = 0
                setTimeout(() => {
                    this.registershow = 'hidden'
                }, 1000);
                this.loginshow = 'visible'
                this.logintop = 0
                this.loginopacity = 1
                this.btntop = 460
                this.tiptext = '没有账号？去注册'
            }
        }
    }
}
</script>

<style scoped>
.login{
    position: relative;
    height: 100%;
    background-color: #f6f6f6;
}
.rowstyle{
    position: relative;
    height: 100%;
    max-height: 700px;
    position: relative;
    top: 100px;
}
.loginbox{
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 8px;
        box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
}
.icon{
    position: relative;
    width: 60%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 3px 0 10px -10px;
    float: left;
}
.inputarea{
    position: relative;
    width: 40%;
    height: 100%;
    float: left;
}
.loginarea{
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 1s;
}
.registerarea{
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 1s;
}
.submitlogin{
    height: 60px;
    width: 60px;
    background-image: url('../assets/imgs/icon/login_button.png');
    background-size: 60px 60px;
    position: absolute;
    left: calc(50% - 25px);
    cursor: pointer;
    transition: all 1s;
}
.submitlogin:hover{
    background-image: url('../assets/imgs/icon/login_button_focus.png');
}
.input{
    height: 40px;
    width: 70%;
    position: absolute;
    left: 15%;
    border: 0;
    outline: none;
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
    font-size: 18px;
}
.sexinput{
    height: 20px;
    width: 100%;
    position: absolute;
    top: 470px;
}
.sexitem{
    height: 15px;
    width: 15px;
    position: absolute;
    top: 5px;
    margin-left: 5px;
}
.tiptext{
    width: 100%;
    cursor: pointer;
    display: block;
    font-size: 15px;
    position: absolute;
    text-align: center;
    line-height: 15px;
    top: 630px;
    color: rgba(100, 100, 100, 0.7);
}
.tiptext:hover{
    color: rgba(70, 70, 70, 0.8);
}
</style>