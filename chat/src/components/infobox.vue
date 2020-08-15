<template>
    <div class="infobox" :style="{'display':isshow ? 'block':'none'}">
        <div class="box">
            <div class="title">{{info.title}}</div>
            <div class="userinfo">
                <img :src='userinfo.portrait' class="portrait">
                <div class="username">{{userinfo.username}}</div>
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
            userinfo:{}
        }
    },
    methods:{
        showbox(data){
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
        },
        btn1click(){
            this.$emit('btn1click',this.userinfo)
        },
        btn2click(){
            this.$emit('btn2click',this.userinfo)
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
    width: 55%;
    margin: 0 auto;
    border-radius: 8px;
        box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-top: calc(50% - 12.5%);
    padding: 10px;
}
.title{
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: rgba(100, 100, 100, 0.9);
}
.userinfo{
    width: 100%;
    height: 50%;
    margin-top: 3%;
    padding: 10px;
    box-sizing: border-box;
    border-top: 1px solid rgba(100, 100, 100,0.15);
    border-bottom: 1px solid rgba(100, 100, 100,0.15);
}
.portrait{
    width: 60px;
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
</style>