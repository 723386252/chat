<template>
    <div id="indexbox">
    <el-row :gutter="0" class="rowstyle">
      <!-- <el-col :xs="0" :sm="5" :lg="5" :xl="5"><div> </div></el-col> -->
      <el-col :xs="{span:24,offset:0}" :sm="{span:14,offset:5}" style="height:100%">
      <div class="chatbox">
          <infobox ref="infobox" class="infobox" @btn1click='btn1click'></infobox>
          <div class="navigator">
              <img :src="user.portrait" alt="" class="myportrait" disabled>
              <div class="newrequest" :style="{'display':requestlist.length == 0 ? 'none':'block'}" @click="showrequest">{{requestlist.length}}</div>
                  <input type="text" class="search" @blur="clearinput" v-model="inputtext" @keydown.enter='search'>
          </div>
          <div class="friendlist">
              <div class="addgroup">
                  <div class="addgroupbutton" style="position:absolute" :style="{'display':showaddicon?'block':'none'}">
                  <img src="../assets/imgs/icon/add_default.png" class="addicon" @click="showgroupiput" >
                  <span class="addgrouptitle">添加分组</span></div>
                  <input type="text" v-model="groupname" class="groupinput" @blur="groupunfocus" @keyup.enter="group" :style="{'width':groupwidth + '%','visibility':showaddinput?'visible':'hidden','zIndex':Zaddinput}">
              </div>
              <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="一致性 Consistency" name="1">
    <div class="listitem">
                  <img :src='user.portrait' alt="" class="portrait">
                  <span class="listusername">用户名</span>
              </div>
  </el-collapse-item>
</el-collapse>
          </div>
          <div class="chat">
              <div class="chathead">
                  <span class="chatname">用户名</span>
              </div>
              <div class="chatcontent"></div>
              <div class="chatinput">
                  <div class="tools"></div>
  <textarea rows="5" id="textinput"></textarea>
  <el-button type="primary" plain class="btn">发送</el-button>
              </div>
          </div>
      </div>
  </el-col>
    </el-row>
    </div>
</template>

<script>
import {getmyinfo} from '../network/api/chat'
import infobox from '../components/infobox'
import {addgroup,getrequest,getuserinfo,initfriend,getgroup} from '../network/api/friend'
export default {
data(){
    return{
        inputtext:'',
        showaddicon:true,
        groupwidth:0,
        Zaddinput:10,
        showaddinput:false,
        activeNames: ['1'],
        groupname:'',
        user:{
            userid:'',
            username:'',
            portrait:''
        },
        requestlist:[],
        temprequest:'',
        usergroup:[]
    }
},
components:{
    infobox
},
    sockets: {
    // 连接后台socket
    connect() {
      console.log('socket connected');
    },
    // 用户后台调用，添加数据
    sendMessage(data) {
      console.log(data);
    },
    // 用户后台调用，打印数据
    receivemsg(data) {
      console.log('receivemsg');
      console.log(data);
    }
  },
  methods: {
    // 发送消息给后台
    send() {
      // 使用emit调用后台的socket中的message方法
      this.$socket.emit("message", {
        userid: 100,
        name: this.name,
        msg: this.msg
      });
    },
    // 建立用户连接
    join() {
      this.$socket.emit("join", {
        userid: this.userid
      });
    },
    // 发送消息给后台 用于私发消息
    sendmsg() {
      this.$socket.emit("sendmsg", {
        userid: this.userid,
        msg: this.msg
      });
    },
    clearinput(){
        this.inputtext = ''
    },
    search(){
        getuserinfo({userid:this.inputtext}).then(res=>{
            if(res.success == 1){
                if(typeof(res.data[0].sex) !== 'undefined'){
                    if(res.data[0].sex == 1){
                        res.data[0].sex = '男'
                    }
                    else{
                        res.data[0].sex = '女'
                    }
                }
                this.$refs.infobox.showbox({
            type:'sendrequest',
            user:res.data[0],
            group:this.usergroup
        })
            }
            else{
                this.$refs.infobox.showbox({
            type:'sendrequest',
            user:{
                portrait:'',
                username:'未找到用户',
                userid:''
            }
        })
            }
        })
        
    },
    showgroupiput(){
        this.showaddicon = false
        this.Zaddinput = 100
        this.showaddinput = true
        this.groupwidth = 100
        setTimeout(() => {
            document.querySelector('.groupinput').focus()
        }, 100);
        
    },
    groupunfocus(){
        this.groupwidth = 0
                    
        // setTimeout(() => {
            this.showaddinput = false
            this.Zaddicon = -1

        // }, 100);

        setTimeout(() => {
            this.showaddicon = true
        },200)
        
    },
     handleChange(val) {
        console.log(val);
      },
      group(){  
          addgroup({
              userid:this.user.userid,
              groupname:this.groupname
          }).then(res=>{
              if(res.success == 1){
                  console.log('添加成功');
                  this.usergroup.push(this.groupname)
              }
              else{
                      console.log('添加失败');
              }
          })
      },
      showrequest(){
          this.temprequest = this.requestlist.pop()
          getuserinfo({
              userid:this.temprequest
          }).then(res=>{
              if(res.data[0].sex == 1){
                  res.data[0].sex = '男'
              }
              else{
                  res.data[0].sex = '女'
              }
              
              this.$refs.infobox.showbox({
              type:'getrequest',
              user:res.data[0],
              group:this.usergroup
          })
          }).catch(err=>{
              err
              this.requestlist.push(this.temprequest)
          })
          
      },
      btn1click(data){
          if(data.type == 'sendrequest'){
              console.log(data);
              initfriend({
                  userid:this.user.userid,
                  friendid:data.userinfo.userid,
                  groupid:data.groupid
              }).then(res=>{
                  if(res.success == 0){
                      if(res.error_code == 102){
                          console.log('好友已存在');
                      }
                      else if(res.error_code == 101){
                          console.log('数据库读取错误');
                      }
                  }
              }).catch(err=>{
                  err
                  console.log('请求错误');
              })
          }
      }
    },
created(){
    getmyinfo().then(res=>{
        this.user.userid = res.data.userid
        this.user.username = res.data.username
        this.user.portrait = res.data.portrait

        getrequest({userid:this.user.userid}).then(res=>{
        if(res.success == 1){
            console.log(res);
            res.data.forEach(item=>{
                this.requestlist.push(item.from)
            })
        }
    }).catch(err=>{
        err
        console.log('获取请求信息失败');
    })
        getgroup({userid:res.data.userid}).then(res=>{
            this.usergroup = res.data
            console.log(this.usergroup);
        }).catch(err=>{
            err
            console.log('获取分组失败');
        })
    }).catch(err=>{
        err
        console.log('获取用户信息失败');
    })
    
}
}
</script>

<style scoped>
#indexbox{
    height: 100%;
    background-color: #f6f6f6;

}
.rowstyle{
    height: 100%;
    max-height: 700px;
    position: relative;
    top: 100px;
}
.chatbox{
    height: 100%;
    width: 100%;
    border-radius: 8px;
        box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
}
.navigator{
    position: relative;
    height: 57px;
    width: 100%;
    border-bottom: 1px solid rgba(100, 100, 100, 0.15);
    box-sizing: border-box;
}
.friendlist{
    width: 32%;
    height: 644px;
    float: left;
    box-sizing: border-box;
    box-shadow:  4px 0px 15px -15px #5E5E5E;
}
.chat{
    height: 644px;
    width: 68%;

    float: left;
    box-sizing: border-box;
}


.search{
    height: 36px;
    width: 36px;
    border-radius: 18px;
    float: left;
    transition: 300ms all;
    margin: 0 auto;
    margin-top: 9.5px;
    background-image: url('../assets/imgs/icon/search.png');
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 8px 8px;
    outline: none;
    border: 0;
    background-color:rgba(200, 200, 200, 0.2);
    font-size: 16px;
    box-sizing: border-box;
    margin-left: 20%;
    }
.search:hover{
    width: 280px;
    padding: 10px 10px 10px 50px;
    background-position: 16px 8px;
}
.search:focus{
    width: 280px;
    padding: 10px 10px 10px 50px;
    background-color: white;
    border: 1px solid rgba(150, 150, 150, 0.4);
    background-position: 16px 8px;
}
.myportrait{
    height: 34px;
    width: 34px;
    margin-left: 2%;
    margin-top: 10.5px;
    display: block;
    float: left;
}
.listitem{
    width: 100%;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    border-top:  1px solid rgba(100, 100, 100, 0.15);
    border-bottom: 1px solid rgba(100, 100, 100, 0.15);
}
.listitem:hover{
    background-color: rgba(200, 200, 200, 0.1);
    transition: 300ms all;
}
.portrait{
    height: 30px;
    width: 30px;
    margin-top: 5px;
    float: left;
}
.listusername{
    float: left;
    font-size: 15px;
    line-height: 15px;
    font-weight: 600;
    font-family: NSimSun ;
    margin-left: 5%;
}
.chathead{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid rgba(100, 100, 100, 0.15);
    padding: 10px;
    box-sizing: border-box;
}
.chatcontent{
    height: 415px;
    width: 100%;

    box-sizing: border-box;
}
.chatinput{
    position: relative;
    height: 175px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
.chatname{
    font-size: 15px;
    font-weight: 600;
    font-family: NSimSun ;
    line-height: 15px;
    margin-left: 3%;
}
.tools{
    height: 35px;
    width: 100%;
    border-top: 1px solid rgba(100, 100, 100, 0.15);
    box-sizing: border-box;
}
#textinput{
    width: 100%;
    max-height: 100px;
    min-height: 100px;
    resize: none;
    border: 0;
    background-color: transparent;
    outline: none;
    font-size: 16px;
}
#submitbuttom{
    top: 3px;
    float: right;
    margin-top: 4px;
    margin-right: 18px;
}
.btn{
    position: absolute;
    right: 10px;
    bottom: -5px;
}
.addgroup{
    width: 100%;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    border-bottom:  1px solid rgba(100, 100, 100, 0.15);
}
.addicon{
    height:100%;
    display: block;
    cursor: pointer;
    float: left;

}
.groupinput{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    outline: none;
    background-color: rgba(100, 100, 100, 0.15);
    border: 0;
    border-radius: 5px;
    transition: all 200ms;
    float: left;

}
.addgrouptitle{
    color: rgba(100, 100, 100, 0.8);
    font-size: 16px;
    line-height:16px;
    display: inline-block;
    margin-top: 6px;
    margin-left: 10%;
}
.addgroupbutton{
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    position: absolute;
}


.grouplist{
    width: 100%;
}
.grouptitle{
width: 100%;
height: 20px;
padding: 3px 10px;
font-size: 14px;
background-color: rgba(100, 100, 100, 0.2);
box-sizing: border-box ;
line-height: 14px;
transition: all 200ms;
}
.grouptitle:hover{
    background-color: rgba(100, 100, 100, 0.3);
}
.newrequest{
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: red;
    float: left;
    margin-top: 18.5px;
    margin-left: 11%;
    position: absolute;
        cursor: pointer;
    user-select: none;
    color: white;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
}
@media screen and (max-width: 860px){
    .newrequest{
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: red;
    float: left;
    margin-top: 18.5px;
    margin-left: 54px;
    position: absolute;
    cursor: pointer;
    user-select: none;
    color: white;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
}
}
@media screen and (max-width:500px){
    .friendlist{
            width: 140px;
    height: 644px;
    float: left;
    box-sizing: border-box;
    box-shadow:  4px 0px 15px -15px #5E5E5E;
    }
    .chat{
    height: 644px;
    width: calc(100% - 140px);

    float: left;
    box-sizing: border-box;
}
}
@media screen and (max-width:768px){
    .infobox{
        width: 100%;
    }
}
</style>