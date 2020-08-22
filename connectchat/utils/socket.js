module.exports = function (server) {
    const chatapi = require('../api/chat')
    var io = require('socket.io')(server);
  // 用于存储每个用户的socket，实现私聊的功能
    let arrAllSocket = {}
  // 穿件socket连接
    io.on('connection', socket => {
      // join函数 用于用户连接
      socket.on('join', (obj)=> {
        // 保存每个用户的连接状态 用于私发消息
        arrAllSocket[obj.userid] = socket
      })
      // 私发消息
      socket.on('sendmsg', function (data) {
        let targetto = arrAllSocket[data.to]
        let targetfrom = arrAllSocket[data.from]
          let {from,to,message} = data
          chatapi.sendmessage(from,to,message).then(res=>{
            if (targetto && targetfrom) {
              targetto.emit('receivemsg',res)
              targetfrom.emit('sendsuccess',res)
            }
          })
          
      })
      //好友请求
      socket.on('sendrequest',data=>{
        let target = arrAllSocket[data.friendid]
        if(target){
        target.emit('receiverequest',{
          from:data.userid,
          requestid:data.requestid
        })}
      })
    })
  }