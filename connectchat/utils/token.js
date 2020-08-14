const jwt = require('jsonwebtoken');

exports.gettoken = function(data) {
    var token = jwt.sign(
        data,
         "sheweijie",//密匙
         {
        expiresIn : 60*60*24// 授权时效24小时
    });
    // 发送给前端，存在浏览器里
return token
}