<template>
    <div id="indexbox">
    <el-row :gutter="0" class="rowstyle">
      <!-- <el-col :xs="0" :sm="5" :lg="5" :xl="5"><div> </div></el-col> -->
      <el-col :xs="{span:24,offset:0}" :sm="{span:14,offset:5}" style="height:100%">
      <div class="chatbox">
          <div class="navigator">
              <img src="../assets/imgs/icon/search.png" alt="" class="myportrait" disabled>
                  <input type="text" class="search">
          </div>
          <div class="friendlist">
              <div class="listitem">
                  <img src="../assets/imgs/icon/search.png" alt="" class="portrait">
                  <span class="listusername">用户名</span>
              </div>
          </div>
          <div class="chat">
              <div class="chathead">
                  <span class="chatname">用户名</span>
              </div>
              <div class="chatcontent"></div>
              <div class="chatinput">
                  <div class="tools"></div>
  <textarea rows="5" id="textinput"></textarea>
  <el-button type="primary" plain class="btn">主要按钮</el-button>
              </div>
          </div>
      </div>
  </el-col>
    </el-row>
    </div>
</template>

<script>
export default {

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
    width: calc(100% - 32%);

    float: left;
    box-sizing: border-box;
}


.search{
    height: 36px;
    width: 36px;
    border-radius: 18px;
    float: left;
    transition: 300ms all;
    margin-left: 10%;
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
    
    }
.search:hover{
    width: 280px;
    padding: 10px 10px 10px 40px;
}
.search:focus{
    width: 280px;
    padding: 10px 10px 10px 40px;
    background-color: white;
    border: 1px solid rgba(150, 150, 150, 0.4);

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
    height: 60px;
    padding: 10px;
    box-sizing: border-box;
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
</style>