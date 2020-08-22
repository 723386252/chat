var express = require('express');
var router = express.Router();
const chatapi = require('../api/chat')

/* GET users listing. */
router.get('/getmyinfo', function(req, res, next) {
  res.send({data:req.user})
});

router.get('/getchatrecord',(req,res)=>{
  let {userid,friendid} = req.query
  chatapi.getchatrecord(userid,friendid).then(result=>{
    res.send({
      success:1,
      error_code:0,
      data:result
    })
  }).catch(error=>{
    res.send({
      success:0,
      error_code:101
    })
  })
})
module.exports = router;
