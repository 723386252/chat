var express = require('express');
var router = express.Router();
let upload = require('../utils/multer')
let loginapi = require('../api/login')

function uploadcheck(req,res,next) {
    upload.single('portrait')(req,res,err=>{
      next()
    })
}

router.post('/submitportrait',uploadcheck, (req, res)=> {
  let portrait = 'http://127.0.0.1:3000'+req.file.destination.split('.')[1] + req.file.filename
  res.send({
    portrait
  })
});
router.post('/register', (req, res)=> {
  let {registerid:userid,registername:username,registerpsw:password,portrait,registersex:sex}=req.body
  console.log(userid,username,password,portrait,sex);
  loginapi.submitregister(userid,username,password,portrait,sex).then(result=>{
    res.send({
      success:1,
      error_code:0
    })
  }).catch(error=>{
    res.send({
      success:0,
      error_code:100
    })
  })
  
});

module.exports = router;
