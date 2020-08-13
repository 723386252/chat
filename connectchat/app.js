var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var loginrouter = require('./routes/login');
var chatrouter = require('./routes/chat');
var session = require('express-session')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: 'key', // 设置 cookie 中保存 session id 的字段名称
  secret: 'sahdkusahdlsadhl', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    httpOnly:false,
      maxAge: 10000000000 // 过期时间，过期后 cookie 中的 session id 自动删除
  }
}))
app.use(express.static('/assets'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get("origin")); //先允许跨域请求才能进来
  res.header("Access-Control-Allow-Credentials", true);//处理cookie信息，如果有，并且不对每次请求都新开一个session
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
  res.header('Access-Control-Allow-Headers', 'x-requested-with,content-type');
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
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
