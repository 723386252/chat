<template>
    <div id="indexbox">
        <div class="row rowstyle">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
      <div class="chatbox">
          <div class="navigator">
              <img src="../assets/imgs/icon/search.png" alt="" class="myportrait" disabled>
                  <input type="text" class="search">
          </div>
          <div class="friendlist">
              <div class="listitem">
                  <img src="../assets/imgs/icon/search.png" alt="" class="portrait">
              </div>
          </div>
          <div class="chat"></div>
      </div>
  </div>
  <div class="col-sm-3"></div>
</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#indexbox{
    height: 100%;

}
.head{
    width: 100%;
    height: 13.72%;
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
    border: 1px black solid;
}
.navigator{
    height: 57px;
    width: 100%;
    border: 1px solid black;
}
.friendlist{
    width: 32%;
    height: 644px;
    float: left;
    border: 1px solid black;
}
.chat{
    height: 644px;
    width: calc(100% - 32%);
    border: 1px solid black;
    float: left;
}


.search{
    height: 36px;
    width: 36px;
    border: 1px solid black;
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
    font-size: 16px;
    
    }
.search:hover{
    width: 280px;
    padding: 10px 10px 10px 40px
}
.search:focus{
        width: 280px;
    padding: 10px 10px 10px 40px
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
    height: 80px;
    padding: 10px;
    border: 1px black solid;
    border-bottom: 1px solid black;
}
.portrait{
    height: 50px;
    width: 50px;
    margin-top: 5px;
}
</style>