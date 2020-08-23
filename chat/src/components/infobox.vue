<template>
    <div class="infobox" :style="{'display':isshow ? 'block':'none'}">
        <div class="box">
            <div class="title">{{info.title}}</div>
            <div class="userinfo">
                <img :src="userinfo.portrait" class="portrait">
                <div class="info_main">
                    <div class="username">{{userinfo.username}}</div>
                <div class="usersex">{{userinfo.sex}}</div>
                <el-select v-model="selectgroup" placeholder="分组" class="group">
    <el-option
      v-for="item in group"
      :key="item.groupid"
      :label="item.groupname"
      :value="item.groupid"
      >
    </el-option>
  </el-select>
                </div>
                
            </div>
            <div class="buttonbox">
            <div class="button" @click="btn1click">{{info.button1}}</div>
            </div>
            <div class="buttonbox">
            <div class="button" @click="btn2click">{{info.button2}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isshow:false,
            title:'',
            info:{},
            userinfo:{},
            type:'',
            group:[],
            selectgroup:''
        }
    },
    methods:{
        showbox(data){
            this.type = data.type
            this.isshow =true
            if(data.type == 'sendrequest'){
                this.info = {
                    title:'搜索好友',
                    button1:'发送',
                    button2:'取消'
                }
            }
            else if(data.type == 'getrequest'){
                this.info = {
                    title:'好友请求',
                    button1:'接受',
                    button2:'拒绝'
                }
            }
            this.userinfo = data.user
            this.group = data.group
        },
        btn1click(){
            if(this.selectgroup == ''){
                alert('请选择分组')
            }
            else{
                this.isshow = false
                this.$emit('btn1click',{userinfo:this.userinfo,groupid:this.selectgroup,type:this.type,portrait:this.userinfo.portrait,sex:this.userinfo.sex})
            setTimeout(() => {
                this.selectgroup = ''
            });
            }

        },
        btn2click(){
            this.isshow = false
            this.selectgroup = ''
            this.$emit('btn2click',{userinfo:this.userinfo,groupid:this.selectgroup,type:this.type})
        },
    }
}
</script>

<style scoped>
.infobox{
    position: absolute;
    height: 100%;
    width: 58.33%;
    
}
.box{
    
    height: 25%;
    width: 40%;
    min-width: 300px;
    border-radius: 8px;
        box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 10px;
    position: absolute;
    left: 30%;
    top: 37.5%;
}
.title{
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: rgba(100, 100, 100, 0.9);
}
.userinfo{
    width: 100%;
    height: 55%;
    margin-top: 3%;
    padding: 10px;
    box-sizing: border-box;
    border-top: 1px solid rgba(100, 100, 100,0.15);
    border-bottom: 1px solid rgba(100, 100, 100,0.15);
}
.portrait{
    height: 100%;
    display: block;
    float: left;
}
.username{
    font-size: 18px;
    float: left;
    margin-left: 10%;
    color: rgba(100, 100, 100,1);
}
.buttonbox{
    width: 50%;
    float: left;
}
.button{
    margin: 0 auto;
    margin-top: 5%;
    border:  1px solid rgba(100, 100, 100,0.4);
    padding: 3px 5px;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    width: 32px;
}
.button:hover{
    background-color: rgba(100, 100, 100,0.3);
    border:  1px solid white;
    color: white;
}
.usersex{
    font-size: 14px;
    margin-left: 20%;
    float: left;
    margin-top: 4px;
    color: rgba(100, 100, 100,1);
}
.info_main{
    float: left;
    margin-left: 10%;
}
.group{
    width: 120px;
    float: left;
    display: block;
    clear: both;
}
</style>