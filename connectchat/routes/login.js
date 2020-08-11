var express = require('express');
var router = express.Router();
let upload = require('../utils/multer')

function uploadcheck(req,res,next) {
    upload.single('')(req,res,err=>{
      next()
    })
}

router.post('/submitportrait',uploadcheck, (req, res)=> {
  console.log(req.file);
});
router.post('/register', (req, res)=> {
  // console.log(req.body);
  res.send({
    data:req.body
  })
});

module.exports = router;
