var express = require('express');
var router = express.Router();
let upload = require('../utils/multer')
let loginapi = require('../api/login')
const md5 = require('md5')
const Token = require('../utils/token')


function uploadcheck(req,res,next) {
    upload.single('portrait')(req,res,err=>{
      next()
    })
}
router.get('/', function(req, res, next) {
  // console.log(req.user);
  res.send({data:req.user})
});

router.post('/submitportrait',uploadcheck, (req, res)=> {
  let portrait = req.file.destination.split('.')[1] + req.file.filename
  console.log(req.session);
  res.send({
    portrait
  })
});
router.post('/register', (req, res)=> {
  let {userid,username,password,portrait,sex}=req.body
  password = md5(password)
  if(portrait == ''){
    portrait = '/assets/imgs/icon/default_portrait.jpg'
  }
  loginapi.submitregister(userid,username,password,portrait,sex).then(result=>{
    res.send({
      success:1,
      error_code:0
    })
  }).catch(error=>{
    console.log(error);
    res.send({
      success:0,
      error_code:100
    })
  })
  
});
router.post('/login',(req,res)=>{
  let {userid,password} = req.body
  loginapi.submitlogin(userid,md5(password)).then(result=>{
    // console.log(result);
    if(result !== null){
      let token = Token.gettoken({
        userid:result.dataValues.userid,
        username:result.dataValues.username
      })
      console.log(token);
      res.send({
        success:1,
        error_code:0,
        data:{
          username:result.dataValues.username,
          portrait:result.dataValues.portrait,
          token
        }
      })
    }
    else{
      res.send({
        success:0,
        error_code:101
      })
    }
  }).catch(error=>{
    console.log(error);
    res.send({
      success:0,
      error_code:100
    })
  })
})
module.exports = router;
