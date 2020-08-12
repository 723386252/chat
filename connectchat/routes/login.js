var express = require('express');
var router = express.Router();
let upload = require('../utils/multer')

function uploadcheck(req,res,next) {
    upload.single('portrait')(req,res,err=>{
      next()
    })
}

router.post('/submitportrait',uploadcheck, (req, res)=> {
  console.log(req.file);
  let portrait = 'http://127.0.0.1:3000'+req.file.destination.split('.')[1] + req.file.filename
  res.send({
    portrait
  })
});
router.post('/register', (req, res)=> {
  // console.log(req.body);
  res.send({
    data:req.body
  })
});

module.exports = router;
