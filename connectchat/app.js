var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var loginrouter = require('./routes/login');
var chatrouter = require('./routes/chat');
const expressJwt = require('express-jwt')

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  console.log(req.url);
  next()
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(expressJwt({
  secret: 'sheweijie',  // 签名的密钥 或 PublicKey
  algorithms:['HS256']  //默认解析格式
}).unless({
  path: ['/login', '/register','/submitportrait',/\/socket.io/]  // 指定路径不经过 Token 解析
}))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(function(req, res, next) {
  // console.log(req.get('origin'));
  res.header('Access-Control-Allow-Origin', req.get("origin")); //先允许跨域请求才能进来
  res.header("Access-Control-Allow-Credentials", true);//处理cookie信息，如果有，并且不对每次请求都新开一个session
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");//允许的请求方法
  res.header('Access-Control-Allow-Headers', 'x-requested-with,content-type,Authorization');//设置请求头部的内容
  next();
});
app.use('/', loginrouter);
app.use('/chat', chatrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (err.name === 'UnauthorizedError') {   
}
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
app.use(function (err, req, res, next) {
  
});

module.exports = app;
